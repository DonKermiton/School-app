import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {auth} from 'firebase/app';
import * as firebase from "firebase";
import set = Reflect.set;



export interface Roles {
  admin?:boolean;
  editor?:boolean;
  sub?: boolean;
}

export interface User {
  uid: string;
  email: string;
  roles?: Roles;
  photoURL?: string;
  displayName?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  profileInfo = new BehaviorSubject<User>(null);
  user$: Observable<any>;
  error: string;


  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,

  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

   AutoLogin(){

        this.afAuth.authState.subscribe(value => {
          if(value !== null) {
            this.getPersonalData(value);
          }
        });
   }

  async createUserViaEmail(email: string, password: string) {
   await this.afAuth.createUserWithEmailAndPassword(email, password)
     .then(user => {
       this.getPersonalData(user.user);
       this.setDeaultUserData(user.user);
     })
     .catch(console.log);

  }

   logViaEmail(email: string, password: string) {
     this.afAuth.signInWithEmailAndPassword(email, password)
      .then(e => {
        this.getPersonalData(e.user);
          // this.handleAuth(e.credential,);
      }).catch(error=> {
        this.error = error.message;
    })

  }


  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);

    await this.updateUserData(credential.user);
    return this.getPersonalData(credential.user);

  }


  async signOut() {
    await this.afAuth.signOut();
    return this.router.navigate(['/']);


  }

  getPersonalData(user){
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const profile = userRef.valueChanges();

    profile.subscribe(value => {
      this.profileInfo.next(value);
    })
    this.router.navigate(['/profile']);
  }

    setDeaultUserData(user,){
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
      user = {
        uid: user.uid,
        email: user.email,
        displayName: '',
        photoURL: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
        roles: {
          admin: false,
          editor: false,
          sub: true,
        }
      };
      this.router.navigate(['/profile']);
      return userRef.set(user, { merge: true });
    }


   updateUserData(user) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    let e = this.afs.collection('users').doc(`${user.uid}`).valueChanges();
    e.subscribe(value => {
      user = value;
    }, error => console.log(error));

      user = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        edit: true,
      };
    this.router.navigate(['/profile']);
    return userRef.set(user, { merge: true });



  }


  private checkAuth(user: User, allowedRoles: string[]): boolean{
    if(!user){
      return false;
    }else{
      for(const role of allowedRoles){
        if(user.roles[role]){
          return true;
        }
      }
      return false
    }
  }


  canRead(user: User): boolean{
    const allowed = ['admin', 'sub', 'editor'];
    return this.checkAuth(user, allowed);
  }
  canEdit(user: User): boolean{
    const allowed = ['admin', 'editor'];
    return this.checkAuth(user, allowed);
  }
  canDelete(user: User): boolean{
    const allowed = ['admin'];
    return this.checkAuth(user, allowed);
  }
}

