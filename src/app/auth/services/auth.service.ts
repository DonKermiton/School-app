import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, of} from "rxjs";
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {auth} from 'firebase/app';
import * as firebase from "firebase";
import {User} from "../models/user.model";
import {studentsService} from "../../students/services/students.service";


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
    private studentService: studentsService,
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


  AutoLogin() {
    this.afAuth.authState.subscribe(value => {
      if (value !== null) {
        this.getPersonalData(value);
      }
    });
  }

  createUserViaEmail(email: string, password: string, group: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        this.getPersonalData(user.user);
        this.setDeaultUserData(user.user, group);
        this.studentService.createStudentData(user.user.uid, group);
      })
      .catch(error => this.error = error);

  }

  logViaEmail(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(e => {
        this.getPersonalData(e.user);

        // console.log(e.additionalUserInfo); // nie usuwaj
        // this.handleAuth(e.credential,);
      }).catch(error => {
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


  getPersonalData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const profile = userRef.valueChanges();

    profile.subscribe(value => {
      this.profileInfo.next(value);
    })

  }
  //TODO create another service to handle actions

  setDeaultUserData(user, group) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    user = {
      uid: user.uid,
      email: user.email,
      displayName: '',
      group,
      photoURL: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
      roles: {
        admin: false,
        editor: false,
        sub: true,
      }
    };
    this.router.navigate(['/profile']);
    return userRef.set(user, {merge: true});
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
    };
    this.router.navigate(['/profile']);
    return userRef.set(user, {merge: true});
  }

  resetPassword(email) {
    this.afAuth.sendPasswordResetEmail(email).then().catch(error => this.error = error);

  }

  deleteUser(userUID) {
    //TODO delete student data to Change
    // this.afs.collection('marks').doc(userUID).delete();
    this.afs.collection('users').doc(userUID)
      .delete()
      .then(() => {
          firebase.auth().currentUser.delete().catch(console.log);

          this.signOut().catch(console.log);
        }
      );
  }

  changeEmail(email) {
    // firebase.auth().currentUser.updateEmail('pietrucha2112221@gmail.com').catch(console.log);
    return;
  }

  canRead(user: User): boolean {
    const allowed = ['admin', 'sub', 'editor'];
    return this.checkAuth(user, allowed);
  }

  canEdit(user: User): boolean {
    const allowed = ['admin', 'editor'];
    return this.checkAuth(user, allowed);
  }

  canDelete(user: User): boolean {
    const allowed = ['admin'];
    return this.checkAuth(user, allowed);
  }

  private checkAuth(user: User, allowedRoles: string[]): boolean {
    if (!user) {
      return false;
    } else {
      for (const role of allowedRoles) {
        if (user.roles[role]) {
          return true;
        }
      }
      return false
    }
  }


}

