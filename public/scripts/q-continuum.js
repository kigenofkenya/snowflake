// See https://github.com/stowball/quench-vue for more information
 // this data can come from firebase
var bun = 'vs food';
var ENV = '<b>dev</b>';
var PORT = 3000;
var boolTrue = true;
var boolFalse = false;
var globalObj = {
  foo: 'bar',
  baz: 'qux'
};

var qContinuum = document.getElementById('q-continuum');

console.time && console.time('mount');
console.time && console.time('createAppData');
var qdata = quenchVue.createAppData(qContinuum);
console.timeEnd && console.timeEnd('createAppData');
console.time && console.time('createAppTemplate');
var template = quenchVue.createAppTemplate(qContinuum);
console.timeEnd && console.timeEnd('createAppTemplate');

console.log('qdata', qdata);
// console.log('outerHTML', qContinuum.outerHTML);
// console.log('template', template);

Vue.component('my-component', {
  props: ['message'],
  template: '<p>My component {{ message }} and hydrated</p>'
});

var QContinuum = new Vue({
  el: qContinuum,
  data: qdata,
  template: template,
  methods: {
    addName: function addName() {
      this.names.push({
        value: Math.random()
      });
    },
    deleteTodo: function deleteTodo() {
      this.todos.pop();
    }
  },
  mounted: function mounted() {
    console.timeEnd && console.timeEnd('mount');
  }
});