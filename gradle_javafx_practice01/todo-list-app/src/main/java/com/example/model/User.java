public class User {
    private String userId;
    private String name;
    private List<Todo> todos;

    public User(String userId, String name) {
        this.userId = userId;
        this.name = name;
        this.todos = new ArrayList<>();
    }

    public String getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }

    public List<Todo> getTodos() {
        return todos;
    }

    public void addTodo(Todo todo) {
        todos.add(todo);
    }

    public void removeTodo(Todo todo) {
        todos.remove(todo);
    }

    public void clearTodos() {
        todos.clear();
    }
}