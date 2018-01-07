// needs editing and then encapsulating for multiple instances, probably seperate instantiation and methods    
const cc = {
  filterCC: function filterCC(targarr, reqkey, reqval) {
    var filter1 = targarr.filter(function (el) {
      return el[reqkey] === reqval;
    });
    return filter1;
  },
  indexCC: function indexCC(targarr, reqkey, reqval) {
    var indexes = targarr.map(function (obj, index) {
      if (obj[reqkey] == reqval) {
        return index;
      }
    }).filter(isFinite);
    return indexes;
  }
};
function jsonStr(obj) {
  var str = JSON.stringify(obj, undefined, 2);
  console.log(str);
};
  // Initialize Firebase

const config = {
  apiKey: "AIzaSyBw9q-IzmeUAoXbX6MZcYMuyNiM3IFJrWM",
  authDomain: "revision6.firebaseapp.com",
  databaseURL: "https://revision6.firebaseio.com",
  storageBucket: "firebase-revision6.appspot.com",
  messagingSenderId: "442959125014"
};
firebase.initializeApp(config);
const db = firebase.database();

function initHook(refStateMachine,refkey) {
  const sm = refStateMachine
  // sm.testMeth('init message')
  let dbRef = db.ref(refkey)
  function hookVueEvents() {
    console.log('vue events hooked')
    dbRef.on('child_added', (data) => {
      if (!sm.fbReady) { return }
      console.log('dbRef detected child addition',data.val())
    sm[refkey].push(Object.assign({fbkey:data.key}, data.val()))
    });
    dbRef.on('child_changed', (data) => {
      if (!sm.fbReady) { return }
      let itemIndex = cc.indexCC(sm[refkey], 'fbkey', data.key)[0]
      console.log('dbRef detected child change',data.val())
      // console.log(sm[refkey][itemIndex])
      // sm[refkey][itemIndex] = Object.assign({fbkey:data.key}, data.val())
      sm[refkey].splice( itemIndex, 1,Object.assign({fbkey:data.key}, data.val()) )
      // sm[refkey][]
      // {fbkey:childKey}, childData)
    });
    dbRef.on('child_removed', (data) => {
      if (!sm.fbReady) { return }
      let itemIndex = cc.indexCC(sm[refkey], 'fbkey', data.key)[0]
      sm[refkey].splice( itemIndex, 1 )
      console.log('dbRef detected child removed',data.key,itemIndex);

    });
    sm.addRef = function(data) {
      console.log('sm addRef',data)
      dbRef.push(data)
    }
    sm.removeRef = function(refid) {
      console.log('sm removeRef',refid)
      dbRef.child(refid).remove();
    }
    sm.editRef = function(refid,data) {
      console.log('sm editRef',refid)
      dbRef.child(refid).set(data);
    }
    setTimeout(() =>{
      sm.fbReady = true
    }, 1000)
  }
  dbRef.once('value', function(snapshot) {
    // console.log('resourcetreeRef once value',snapshot.key);
    let snapObj = snapshot.val();
    // jsonStr(snapshot.val())
    let snapKeys = Object.keys(snapObj);
    let itemsProcessed = 0;
    let procItems = [];
    let childItems = [];
    let result = [];
    snapshot.forEach(function(childSnapshot) {
      let childKey = childSnapshot.key;
      let childData = childSnapshot.val();
      procItems.push({ parsedData: Object.assign({fbkey:childKey}, childData), snap: childSnapshot } );
      result.push(Object.assign({fbkey:childKey}, childData))
      itemsProcessed++;
        if(itemsProcessed === snapKeys.length) {
          // console.log('itemsProcessed')

          hookVueEvents()
          sm[refkey] = result
        }
    });
  });
}

let self
new Vue({
  el: '#app',
  data: {
    title: 'BifrostBridge 3.1 @ revision6',
    newTodoText: '',
    testMsg: 'default',
    newItem: {},
    inspectItem: {},
    editItem: '',
    detailMode: 'default',
    todos: [],
    fbReady: false,
    delay: 300,
    clicks: 0,
    timer: null
  },
  methods: {
    addItem(vmref,dbref,item) {
      if (!item.text) { return }
        console.log('addItem',item)
        self.addRef(item) // dbref here
        self[vmref]= {}
    },
    handleEdit(item){
      self.editItem = Object.assign({},item)

    },
    handleInspect(item){
      self.inspectItem = Object.assign({},item)

    },
    ctxClick(item,event){
      self.clicks++ 
      if(this.clicks === 1) {
        this.timer = setTimeout(function() {
          self.clicks = 0
          // single
          self.detailMode = 'inspect'
          if (self.inspectItem === item) {
            return;
          }
          self.handleInspect(item)
        }, this.delay);
      } else {
          clearTimeout(this.timer);
          this.clicks = 0;
          self.detailMode = 'edit'
          if (self.editItem === item) {
            return;
          }
         // dbl
         self.handleEdit(item)
      }         
    },
    testMeth (newMsg) {
      self.testMsg = newMsg
    },
    addTodo () {
      if (this.newTodoText) {
        self.addRef({
          text: this.newTodoText
        })
        this.newTodoText = ''
      }
    },
    updateTodo (idref,newData) {
      // the id is newData[idref]
      let thisData  = Object.assign({}, newData)
      let refid = thisData[idref]
      // console.log(refid)
      delete thisData[idref]
      // console.log('updating todo',refid,thisData)
      self.editRef(refid,thisData)
      self.detailMode = 'default'
    },
    removeTodo (todo) {
      // console.log('removing todo',todo.fbkey)
      self.removeRef(todo.fbkey)
      // todosRef.child(todo['.key']).remove()
    }
  },
    created () {
      self = this

    },
    beforeMount() {
      console.log('mounting')
      initHook(self,'todos')
      // hookNlogic(document.getElementById(self.nlogicWrapId))
    },
    mounted() {
      // console.log('mounted')
      this.$nextTick(() => {
      })
    },
    beforeDestroy() {
      // console.log('before destroy')
    }
})