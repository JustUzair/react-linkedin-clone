import { auth, provider, storage } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { SET_USER, SET_LOADING_STATUS, GET_ARTICLES } from "./actionType";
import { Redirect } from "react-router";
import db from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
export const setUser = payload => ({
  type: SET_USER,
  user: payload,
});
export function signInAPI() {
  return dispatch => {
    signInWithPopup(auth, provider)
      .then(payload => {
        // console.log(payload);
        dispatch(setUser(payload.user));
      })
      .catch(error => {
        console.error(error);
      });
  };
}
export function getUserAuth() {
  return dispatch => {
    auth.onAuthStateChanged(async user => {
      if (user) {
        dispatch(setUser(user));
      }
    });
  };
}
export function signOutAPI(props) {
  return dispatch => {
    auth
      .signOut()
      .then(() => {
        dispatch(setUser(null));
      })
      .catch(error => {
        console.error(error);
      });
  };
}

export function postArticleAPI(payload) {
  return dispatch => {
    dispatch(setLoading(true));
    if (payload.image != "") {
      const storageRef = ref(storage, `images/${payload.image.name}`);
      const uploadTask = uploadBytesResumable(
        storageRef,
        payload.image,
        "data_url"
      );
      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log(`Progress : ${progress}%`);
          if (snapshot.state === "RUNNING") {
            // console.log(`Progress : ${progress}%`);
          }
        },
        error => console.log(error.code),
        async () => {
          const donwloadURL = await getDownloadURL(
            uploadTask.snapshot.ref
          ).then(url => url);
          // console.log(donwloadURL);
          addDoc(collection(db, "articles"), {
            actor: {
              description: payload.user.email,
              title: payload.user.displayName,
              date: payload.timestamp,
              image: payload.user.photoURL,
            },
            video: payload.video,
            sharedImg: donwloadURL,
            comments: 0,
            description: payload.description,
          });
          dispatch(setLoading(false));
        }
      );
    } else if (payload.video) {
      addDoc(collection(db, "articles"), {
        actor: {
          description: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        video: payload.video,
        sharedImg: "",
        comments: 0,
        description: payload.description,
      });
      dispatch(setLoading(false));
    }
  };
}
export const setLoading = status => ({
  type: SET_LOADING_STATUS,
  status: status,
});

export const getArticles = payload => ({
  type: GET_ARTICLES,
  payload: payload,
});

export function getArticlesAPI() {
  return dispatch => {
    let payload;
    const messagesColRef = collection(db, "articles");
    const messagesQuery = query(messagesColRef, orderBy("actor.date", "desc"));
    onSnapshot(messagesQuery, snapshot => {
      payload = snapshot.docs.map(doc => doc.data());
      // console.log(payload);
      dispatch(getArticles(payload));
    });
  };
}
