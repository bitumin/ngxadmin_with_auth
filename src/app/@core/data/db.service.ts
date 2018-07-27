import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class DbService implements OnDestroy {

  alive = true;

  constructor(private db: AngularFireDatabase) {
  }

  ngOnDestroy() {
    this.alive = false;
  }

  // /**
  //  * @param parentRef
  //  * @param childKey
  //  * @param childValue
  //  * @returns {Promise}
  //  */
  // childExists(parentRef, childKey, childValue) {
  //   console.info('Checking existence of child with parent ref ' + parentRef + ' where ' + childKey + ' = ' + childValue);
  //
  //   return new Promise((resolve, reject) => {
  //     const ref = this.db.database.ref(parentRef);
  //     ref.orderByChild(childKey).equalTo(childValue).once('value', (snapshot) => {
  //       if (snapshot.val() === null) {
  //         resolve(false);
  //       } else {
  //         resolve(true);
  //       }
  //     }, (err) => {
  //       console.error(err.message);
  //       reject(err);
  //     });
  //   });
  // };

  /**
   * If the pair key value is not unique (other child have it) you may not get the right child!
   * @param parentRef
   * @param childKey
   * @param childValue
   * @returns {Promise}
   */
  getChildByKeyValue(parentRef, childKey, childValue) {
    // console.info('Looking for child with parent ref ' + parentRef + ' where ' + childKey + ' = ' + childValue);
    return new Promise((resolve, reject) => {
      const ref = this.db.database.ref(parentRef);
      ref.orderByChild(childKey).equalTo(childValue).once('value', (snapshot) => {
        const snapshotVal = snapshot.val();
        if (snapshotVal === null) {
          resolve(null);
        } else {
          // Add child key to the child data object for convenience
          const key = Object.keys(snapshotVal)[0];
          const child = snapshotVal[key];
          if (typeof child.key === 'undefined') {
            child.key = key;
          }
          // Return child data
          resolve(child);
        }
      }).catch(err => {
        reject(err);
      });
    });
  };

  // /**
  //  * @param parentRef
  //  * @param childObject
  //  * @returns {Promise}
  //  */
  // addChild(parentRef, childObject) {
  //   console.info('Adding child with parent ref ' + parentRef + ', with data:', childObject);
  //   const ref = this.db.database.ref(parentRef);
  //   const syncRef = $firebaseArray(ref);
  //   return syncRef.$add(childObject);
  // };
  //
  // /**
  //  * @returns {Promise|null}
  //  */
  // getCurrentUserCandidate() {
  //   const user = firebase.auth().currentUser;
  //   if (!user) {
  //     console.error('Current user not logged in!');
  //     return null;
  //   }
  //
  //   return this.getChildByKeyValue('Candidates', 'email', user.email);
  // };
  //
  // /**
  //  * @returns {Promise|null}
  //  */
  // getCurrentUserCompany() {
  //   const user = firebase.auth().currentUser;
  //   if (!user) {
  //     console.error('Current user not logged in!');
  //     return null;
  //   }
  //
  //   return this.getChildByKeyValue('Company', 'email', user.email);
  // };
  //
  // /**
  //  * @returns {Promise|null}
  //  */
  // getCurrentUserCompanyOffers() {
  //   const user = firebase.auth().currentUser;
  //   if (!user) {
  //     console.error('Current user not logged in!');
  //     return null;
  //   }
  //
  //   return this.getChildrenByKeyValue('Offers', 'emailCompany', user.email);
  // };

  /**
   * Returns all children with a given (secondary level) key-value pair
   * @param parentRef
   * @param childKey
   * @param childValue
   * @returns {Promise}
   */
  getChildrenByKeyValue(parentRef, childKey, childValue) {
    // console.info('Getting all children with parent ref ' + parentRef + ' where ' + childKey + ' = ' + childValue);
    return new Promise((resolve, reject) => {
      const ref = this.db.database.ref(parentRef);
      ref.orderByChild(childKey).equalTo(childValue).once('value', (snapshot) => {
        const snapshotVal = snapshot.val();
        if (snapshotVal === null) {
          resolve(null);
        } else {
          const result = Object.keys(snapshotVal).map((key) => {
            // Add key to child data for convenience
            if (typeof snapshotVal[key].key === 'undefined') {
              snapshotVal[key].key = key;
            }
            return snapshotVal[key];
          });
          resolve(result);
        }
      }).catch(err => {
        reject(err);
      });
    });
  };
  //
  // /**
  //  * Returns all values of a children field searching children with a given (secondary level) key-value pair
  //  * @param parentRef
  //  * @param childKey
  //  * @param childValue
  //  * @param targetField
  //  * @returns {Promise}
  //  */
  // getChildrenFieldByKeyValue(parentRef, childKey, childValue, targetField) {
  //   console.info('Getting values of field ' + targetField
  // + ' with children parent ref ' + parentRef + ' where ' + childKey + ' = ' + childValue);
  //   return new Promise((resolve, reject) => {
  //     this.getChildrenByKeyValue(parentRef, childKey, childValue).then((children) => {
  //       if (children === null) {
  //         resolve(null);
  //       } else {
  //         const result = Object.keys(children).map((key) => {
  //           return children[key][targetField];
  //         });
  //         resolve(result);
  //       }
  //     }, (err) => {
  //       console.error(err.message);
  //       reject(err);
  //     });
  //   });
  // };
  //
  // /**
  //  * Returns all children with a given (secondary level) key-value pair
  //  * @param parentRef
  //  * @param childKey
  //  * @param childValue
  //  * @returns {Promise}
  //  */
  // getChildKeyByKeyValue(parentRef, childKey, childValue) {
  //   console.info('Getting child key with parent ref ' + parentRef + ' where ' + childKey + ' = ' + childValue);
  //   return new Promise((resolve, reject) => {
  //     const ref = this.db.database.ref(parentRef);
  //     ref.orderByChild(childKey).equalTo(childValue).once('value', (snapshot) => {
  //       const snapshotVal = snapshot.val();
  //       if (snapshotVal === null) {
  //         resolve(null);
  //       } else {
  //         resolve(Object.keys(snapshotVal)[0]);
  //       }
  //     }, (err) => {
  //       console.error(err.message);
  //       reject(err);
  //     });
  //   });
  // };
  //
  // /**
  //  * Returns all children with a given (secondary level) key-value pair
  //  * @param parentRef
  //  * @param childKey
  //  * @param childValue
  //  * @returns {Promise}
  //  */
  // getChildrenKeysByKeyValue(parentRef, childKey, childValue) {
  //   console.info('Getting all children keys with parent ref ' + parentRef + ' where ' + childKey + ' = ' + childValue);
  //   return new Promise((resolve, reject) => {
  //     const ref = this.db.database.ref(parentRef);
  //     ref.orderByChild(childKey).equalTo(childValue).once('value', (snapshot) => {
  //       const snapshotVal = snapshot.val();
  //       if (snapshotVal === null) {
  //         resolve(null);
  //       } else {
  //         resolve(Object.keys(snapshotVal));
  //       }
  //     }, (err) => {
  //       console.error(err.message);
  //       reject(err);
  //     });
  //   });
  // };
  //
  // /**
  //  * Returns child with a given key
  //  * @param parentRef
  //  * @param childKey
  //  * @returns {Promise}
  //  */
  // getChildByKey(parentRef, childKey) {
  //   console.info('Getting child with parent ref ' + parentRef + ' and key ' + childKey);
  //   return new Promise((resolve, reject) => {
  //     const ref = this.db.database.ref(parentRef);
  //     ref.child(childKey).once('value', (snapshot) => {
  //       const snapshotVal = snapshot.val();
  //       if (snapshotVal === null) {
  //         resolve(null);
  //       } else {
  //         resolve(snapshotVal[Object.keys(snapshotVal)[0]]);
  //       }
  //     }, (err) => {
  //       console.error(err.message);
  //       reject(err);
  //     });
  //   });
  // };
  //
  // /**
  //  * @param firstLevelKey
  //  * @returns {Promise}
  //  */
  // getAllChildren(firstLevelKey) {
  //   console.info('Getting all children with parent ' + firstLevelKey);
  //   return new Promise((resolve, reject) => {
  //     const ref = this.db.database.ref();
  //     ref.child(firstLevelKey).once('value', (snapshot) => {
  //       const snapshotVal = snapshot.val();
  //       if (snapshotVal === null) {
  //         resolve([]);
  //       } else {
  //         const result = Object.keys(snapshotVal).map((key) => {
  //           // Add keys to children data for convenience
  //           if (typeof snapshotVal[key].key === 'undefined') {
  //             snapshotVal[key].key = key;
  //           }
  //           return snapshotVal[key];
  //         });
  //         resolve(result);
  //       }
  //     }, (err) => {
  //       console.error(err.message);
  //       reject(err);
  //     });
  //   });
  // };
  //
  // /**
  //  * @param parentRef
  //  * @param keys
  //  * @returns {Array<Promise>}
  //  */
  // getAllChildrenByKeys(parentRef, keys) {
  //   return keys.map((key) => {
  //     return this.getChildByKey(parentRef, key);
  //   });
  // };
  //
  // /**
  //  * @param parentRef
  //  * @param key
  //  * @param values
  //  * @returns {Promise} promises that resolves in array of values
  //  */
  // getChildrenByKeyValues(parentRef, key, values) {
  //   const promises = values.map((value) => {
  //     return this.getChildByKeyValue(parentRef, key, value);
  //   });
  //   return Promise.all(promises);
  // };
  //
  // /**
  //  * @param parentRef
  //  * @param key
  //  * @param value
  //  * @returns {Promise}
  //  */
  // deleteChildByKeyValue(parentRef, key, value) {
  //   console.info('Deleting child with parentRef ' + parentRef + ' where ' + key + ' = ' + value);
  //   return new Promise((resolve, reject) => {
  //     const ref = this.db.database.ref(parentRef);
  //     ref.orderByChild(key).equalTo(value).once('value', (snapshot) => {
  //       const snapshotVal = snapshot.val();
  //       if (snapshotVal === null) {
  //         console.error('Children not found. Could not delete.');
  //         reject();
  //       } else {
  //         ref.child(Object.keys(snapshotVal)[0]).remove().then(function () {
  //           resolve();
  //         }, (err) => {
  //           console.error(err.message);
  //           reject(err);
  //         });
  //       }
  //     }, (err) => {
  //       console.error(err.message);
  //       reject(err);
  //     });
  //   });
  // };
  //
  // /**
  //  * @param parentRef
  //  * @param childKey
  //  * @param childValue
  //  * @param targetField
  //  * @param newTargetFieldValue
  //  * @returns {promise}
  //  */
  // updateChildFieldByKeyValue(parentRef, childKey, childValue, targetField, newTargetFieldValue) {
  //   console.info('Updating child field ' + targetField + ' with value '
  // + newTargetFieldValue + ', with parentRef ' + parentRef + ' where ' + childKey + ' = ' + childValue);
  //   return new Promise((resolve, reject) => {
  //     this.getChildKeyByKeyValue(parentRef, childKey, childValue).then((key) => {
  //       if (key === null) {
  //         const errMsg = 'Unable to retrieve child key. ¿Child record not found?';
  //         console.error(errMsg);
  //         reject(errMsg);
  //         return;
  //       }
  //
  //       this.updateChildFieldByKey(parentRef, key, targetField, newTargetFieldValue).then(function () {
  //         resolve();
  //       }, (err) => {
  //         console.error(err.message);
  //         reject(err);
  //       });
  //     }, (err) => {
  //       console.error(err.message);
  //       reject(err);
  //     });
  //   });
  // };
  //
  // /**
  //  * @param parentRef
  //  * @param key
  //  * @param targetField
  //  * @param newTargetFieldValue
  //  * @returns {promise}
  //  */
  // updateChildFieldByKey(parentRef, key, targetField, newTargetFieldValue) {
  //   console.info('Updating child field ' + targetField + ' with value '
  // + newTargetFieldValue + ', with parentRef ' + parentRef + ' and record key ' + key);
  //   return new Promise((resolve, reject) => {
  //     const ref = this.db.database.ref(parentRef + '/' + key);
  //     const field = {};
  //     field[targetField] = newTargetFieldValue;
  //     ref.update(field).then(function () {
  //       resolve();
  //     }, (err) => {
  //       console.error(err.message);
  //       reject(err);
  //     });
  //   });
  // };
  //
  // /**
  //  * @param targetField
  //  * @param newTargetFieldValue
  //  * @returns {promise}
  //  */
  // updateCandidateField(targetField, newTargetFieldValue) {
  //   const user = firebase.auth().currentUser;
  //   if (!user) {
  //     console.error('Current user not logged in!');
  //     return null;
  //   }
  //
  //   return this.updateChildFieldByKeyValue('Candidates', 'email', user.email, targetField, newTargetFieldValue);
  // };
  //
  // /**
  //  * @param targetField
  //  * @param newTargetFieldValue
  //  * @returns {promise}
  //  */
  // updateCompanyField(targetField, newTargetFieldValue) {
  //   const user = firebase.auth().currentUser;
  //   if (!user) {
  //     console.error('Current user not logged in!');
  //     return null;
  //   }
  //
  //   return this.updateChildFieldByKeyValue('Company', 'email', user.email, targetField, newTargetFieldValue);
  // };
  //
  // /**
  //  * @param fileData Image encoded in base64
  //  * @param fileName eg. "algo.jpg"
  //  * @param targetStoragePath eg. "images/profiles/candidate"
  //  * @returns {Promise}
  //  */
  // uploadImage(fileData, fileName, targetStoragePath) {
  //   console.info('Uploading image with filename ' + fileName + ' into storage path ' + targetStoragePath);
  //   return new Promise((resolve, reject) => {
  //     /**
  //      * A full list of error codes is available at
  //      * https://firebase.google.com/docs/storage/web/handle-errors
  //      * @param error
  //      */
  //     const storageErrorHandle
  //     (error)
  //     {
  //       switch (error.code) {
  //         case 'storage/unauthorized':
  //           console.error('User doesn\'t have permission to access the object');
  //           break;
  //         case 'storage/canceled':
  //           console.error('User canceled the upload');
  //           break;
  //         case 'storage/unknown':
  //           console.error('Unknown error occurred, inspect error.serverResponse');
  //           break;
  //       }
  //     }
  //     /**
  //      * Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //      * @param snapshot
  //      */
  //     const onUploadStateChanged
  //     (snapshot)
  //     {
  //       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       console.info('Upload is ' + progress + '% done');
  //       switch (snapshot.state) {
  //         case firebase.storage.TaskState.PAUSED: // or 'paused'
  //           console.info('Upload is paused');
  //           break;
  //         case firebase.storage.TaskState.RUNNING: // or 'running'
  //           console.info('Upload is running');
  //           break;
  //       }
  //     }
  //
  //     if (!fileData.startsWith('data:image/jpeg;base64,')) {
  //       const errMsg = 'Image data must be in base64.';
  //       console.error(errMsg);
  //       reject(errMsg);
  //       return;
  //     }
  //
  //     const storageRef = firebase.storage().ref(targetStoragePath);
  //     const uploadTask = storageRef.child(fileName).putString(fileData, 'data_url', { contentType: 'image/jpeg' });
  //     uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, onUploadStateChanged, (err) => {
  //       storageErrorHandle(error);
  //       reject(err);
  //     }, function () { // on upload success...
  //       uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
  //         resolve(downloadURL);
  //       }, (err) => {
  //         console.error(err);
  //         reject(err);
  //       });
  //     });
  //   });
  // };

}
