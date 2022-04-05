class DB {
  private db: any
  private dbName: string

  constructor (dbName: string) {
    this.dbName = dbName
  }

  // open database
  openStore (stores: any) {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(this.dbName, 1)

      // open success
      request.onsuccess = (event: any) => {
        this.db = event.target.result
        resolve(true)
      }

      // open error
      request.onerror = (event: any) => {
        reject(event)
      }

      // system upgrade
      request.onupgradeneeded = (event: any) => {
        const { result }: any = event.target
        for (const storeName in stores) {
          const { keyPath, indexs } = stores[storeName]
          if (!result.objectStoreNames.contains(storeName)) {
            const store = result.createObjectStore(storeName, {
              autoIncrement: true,
              keyPath
            })
            if (indexs && indexs.length) {
              indexs.forEach((v: string) => {
                store.createIndex(v, v, { unique: false })
              })
            }
            store.transaction.oncomplete = (event: any) => {
              console.log('创建对象仓库成功', event)
            }
          }
        }
        console.log('onupgradeneeded', event)
      }
    })
  }

  // add and edit database data
  updateItem (storeName: string, data: any) {
    return new Promise((resolve, reject) => {
      const store = this.db
        .transaction([storeName], 'readwrite')
        .objectStore(storeName)
      const request = store.put({ ...data, updateTime: new Date().getTime() })

      request.onsuccess = (event: any) => {
        resolve(event)
      }
      request.onerror = (event: any) => {
        reject(event)
      }
    })
  }

  deleteItem (storeName: string, key: number | string) {
    return new Promise((resolve, reject) => {
      const store = this.db.transaction([storeName]).objectStore(storeName)
      const request = store.delete(key)

      request.onsuccess = (event: any) => {
        resolve(event)
      }
      request.onerror = (event: any) => {
        reject(event)
      }
    })
  }

  getList (storeName: string, key?: number | string) {
    return new Promise((resolve, reject) => {
      const store = this.db.transaction([storeName]).objectStore(storeName)
      const request =
        typeof key === 'undefined' ? store.getAll() : store.get(key)

      request.onsuccess = (event: any) => {
        resolve(event.target.result)
      }
      request.onerror = (event: any) => {
        reject(event)
      }
    })
  }
}

export default DB
