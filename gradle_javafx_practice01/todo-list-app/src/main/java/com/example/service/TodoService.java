public class TodoService {
    private List<Todo> todos;
    private User user;

    public TodoService(User user) {
        this.user = user;
        this.todos = new ArrayList<>();
    }

    public void addTodo(Todo todo) {
        todos.add(todo);
    }

    public void removeTodo(Todo todo) {
        todos.remove(todo);
    }

    public List<Todo> getTodos() {
        return new ArrayList<>(todos);
    }

    public void clearTodos() {
        todos.clear();
    }

    public void syncWithCloud() {
        CloudSync.syncData(user, todos);
    }
}