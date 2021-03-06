/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  View,
  Navigator,
} from 'react-native';

import TaskList from './TaskList';
import TaskForm from './TaskForm';
import store from './todoStore';

class FullPluralTodo extends Component {
  constructor(props, context) {
    super(props, context);
    // this.state = {
    //   todos: [
    //     {
    //       task: 'Learn React Native',
    //     },
    //     :{
    //       task: 'Learn Redux',
    //     },
    //   ],
    // };
    this.state = store.getState();

    store.subscribe(() => {
      this.setState(store.getState());
    });
  }
  onAddStarted() {
    this.nav.push({
      name: 'taskform',
    });
  }
  onCancel() {
    // console.log('cancelled');
    this.nav.pop();
  }
  onAdd(task) {
    // console.log(`a task was added: ${task}`);
    // this.state.todos.push({ task });
    // this.setState({ todos: this.state.todos });
    store.dispatch({ type: 'ADD_TODO', task });
    this.nav.pop();
  }
  onDone(todo) {
    // console.log(`a todo was completed: ${todo.task}`);
    // const filteredTodos =
    //     this.state.todos.filter((filterTodo) => {
    //       return filterTodo !== todo;
    //     });
    // this.setState({ todos: filteredTodos });
    store.dispatch({
      type: 'DONE_TODO',
      todo,
    });
  }
  onToggle() {
    store.dispatch({
      type: 'TOGGLE_STATE',
    });
  }
  configureScene() {
    return Navigator.SceneConfigs.FloatFromBottom;
  }
  renderScene(route, nav) {
    switch (route.name) {
      case 'taskform':
        return (
          <View style={styles.container}>
            <TaskForm
              onAdd={this.onAdd.bind(this)}
              onCancel={this.onCancel.bind(this)}
            >
            Add form comes here
            </TaskForm>
          </View>
        );
      default:
        return (
          <View style={styles.container}>
            <TaskList
              filter={this.state.filter}
              onDone={this.onDone.bind(this)}
              onToggle={this.onToggle.bind(this)}
              onAddStarted={this.onAddStarted.bind(this)}
              todos={this.state.todos}
            />
          </View>
        );
    }
  }
  render() {
    return (
      <Navigator
        configureScene={this.configureScene}
        initialRoute={{ name: 'tasklist', index: 0 }}
        ref={((nav) => {
          this.nav = nav;
        })}
        renderScene={this.renderScene.bind(this)}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('FullPluralTodo', () => FullPluralTodo);
