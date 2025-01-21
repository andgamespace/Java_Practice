import java.util.Scanner;

public class Practice {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter a number: ");
        int number = scanner.nextInt();
        
        for (int i = 1; i <= number; i++) {
            System.out.println("Count " + i);
        }
        
        scanner.close();
    }
}