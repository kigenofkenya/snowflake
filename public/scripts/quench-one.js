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

var app = document.getElementById('app');

console.time && console.time('mount');
console.time && console.time('createAppData');
var data = quenchVue.createAppData(app);
console.timeEnd && console.timeEnd('createAppData');
console.time && console.time('createAppTemplate');
var template = quenchVue.createAppTemplate(app);
console.timeEnd && console.timeEnd('createAppTemplate');

console.log('data', data);
// console.log('outerHTML', app.outerHTML);
// console.log('template', template);

Vue.component('my-component', {
  props: ['message'],
  template: '<p>My component {{ message }} and hydrated</p>'
});

var App = new Vue({
  el: app,
  data: data,
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