import { updateDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"
export const fetchComID = async (): Promise<string> => {
    const comIdC = "ComID";
    let currID = ''
    try {
        const countRef = doc(db, comIdC, "f1YR38DoE8lUbJqa3MaC")
        currID = (await getDoc(countRef)).get("com-c-id")
    } catch (error) {
        console.error("Fetch id errro: ", error)
    }
    return currID
}

export const addComId = async (_id: string): Promise<void> => {
    const comIdC = "ComID";
    try {
        const countRef = doc(db, comIdC, "f1YR38DoE8lUbJqa3MaC")
        await updateDoc(countRef, { "com-c-id": _id })
    } catch (error) {
        console.error("add errro: ", error)
    }
}

export const fetchIsVerified = async (): Promise<boolean> => {
    let conf = false
    const countCollection = "IframesCounts"
    try {
        const countRef = doc(db, countCollection, "hEedHPYfprSp0rO4PtZW")
        conf = (await getDoc(countRef)).get("isVerified")
    } catch (error) {
        console.error("Fetch count errro: ", error)
    }
    return conf;
}

export const pageCount = async (): Promise<number> => {
    let currCount = 0
    const countCollection = "IframesCounts"
    try {
        const countRef = doc(db, countCollection, "hEedHPYfprSp0rO4PtZW")
        currCount = (await getDoc(countRef)).get("count")
    } catch (error) {
        console.error("Fetch count errro: ", error)
    }
    return currCount;
}

export const fetchLink = async (_page_id: string): Promise<string> => {
    let link = ''
    const mainCollection = "Iframes";
    try {
        const linkRef = doc(db, mainCollection, `${_page_id}`)
        link = (await getDoc(linkRef)).get("link")
    } catch (error) {
        console.error("fetch link error: ", error)
    }
    return link
}

export const addedLink = async (_link: any): Promise<void> => {
    const _date = new Date().toLocaleDateString();
    const _time = new Date().toLocaleTimeString();
    const mainCollection = "Iframes";
    try {
        const response = await fetch(_link);
        if (response.ok && _link !== "") {
            const currCount = await pageCount()
            const _data = {
                link: _link,
                pageId: `p-xe-w3-k1-db-${currCount + 1}`,
                date: _date,
                time: _time,
                owner: "kuldeep"
            }
            const countCollection = "IframesCounts"
            const documentPath = `${mainCollection}/p-xe-w3-k1-db-${currCount + 1}`;
            const mainCollectionRef = doc(db, documentPath);
            const countRef = doc(db, countCollection, "hEedHPYfprSp0rO4PtZW")
            await updateDoc(countRef, { count: currCount + 1 })
            await setDoc(mainCollectionRef, _data, { merge: false });
            window.location.reload();
        }
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export const signInUser = async (email: string, password: string): Promise<void> => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            window.location.reload()
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("error code: ", errorCode)
            console.error("error message: ", errorMessage)
        });
}
export const authState = async () => {
    const auth = getAuth();
    const currUser = auth.currentUser;
    return currUser;
}

export const signOutUser = async (): Promise<void> => {
    const auth = getAuth();
    signOut(auth).then(() => {
        window.location.reload()
    }).catch((error) => {
        console.error("error: ", error)
    });
}