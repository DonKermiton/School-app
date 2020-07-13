import {Injectable} from "@angular/core";
import {Observable, of, Subject} from "rxjs";
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {auth} from 'firebase/app';



export interface Roles {
  admin?:boolean;
  editor?:boolean;
  sub?: boolean;
}

export interface User {
  uid: string;
  email: string;
  roles: Roles;
  photoURL?: string;
  displayName?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  imgSource = new Subject<string>();
  user$: Observable<any>;

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
    this.signOut();
  }

  async createUserViaEmail(email: string, password: string,
                           photoUrl: string,
                           displayName: string) {
        const credential =  this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(value => {
        return this.updateUserData(credential.user);
      }).catch(error => {
        console.log('some error occurred', error);
      })
  }

   logViaEmail(email: string, password: string) {
     this.afAuth.signInWithEmailAndPassword(email, password)
      .then(e => {
        const uidValue = e.user;
        this.updateUserData(uidValue);
        this.imgSource.next(uidValue.photoURL);
      }).catch(error=> {
        console.log(error);
    }).finally(()=>{
      console.log('success')
    });

  }


  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }


  async signOut() {
    await this.afAuth.signOut();
    return this.router.navigate(['/']);
  }


  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      email: user.email,
      roles: {
        sub: true,
      }
    };



    // console.log(this.afs.doc(`users/${user.uid/user.uid.photoURL}`));
    // console.log(this.user$);
    return userRef.set(data, {merge: true});
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

