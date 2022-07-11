<script setup lang="ts">
  const input = ref("");
  const { todos, addTodo, updateTodo, deleteTodo } = useTodos();

  const handleClick = () => {
    addTodo(input.value);
    input.value = "";
  }
</script>
<template>
  <div class="container">
    <NCard class="cards">
      <h1>My todos</h1>
      <div class="add-todo">
        <input type="text" placeholder="Add new todo" v-model="input">
        <NButton @click="handleClick">Add</NButton>
      </div>
      <NCard v-for="todo in todos" :key="todo.id" @click="() => updateTodo(todo.id)" class="card">
        <h4 :class="todo.completed ? 'todo-done' : null"> {{ todo.item }} </h4>
        <p @click="() => deleteTodo(todo.id)"> x </p>
      </NCard>
    </NCard>
  </div>
</template>

<style scoped>
.container {
  padding: 2rem;
  margin: 0 auto;
  max-width: 50%;
}
.cards {
  padding: 2rem;
  margin-bottom: 4rem;
}
.add-todo {
  display: flex;
  justify-content: space-between;
}
input {
  outline: none;
}
.card {
  padding: 0.5rem;
  margin-top: 1rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}
.todo-done {
  text-decoration: line-through;
}
</style>