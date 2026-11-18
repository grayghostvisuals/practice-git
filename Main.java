
public class Main {
    public static void main(String[] args) {

        // 1. Product name and price
        String productName = "Keyboard";
        double price = 49.75;

        // 2. Quantity
        int quantity = 3;

        // 3. Calculate total cost
        double totalCost = price * quantity;

        // 4. Type casting (double to int)
        int discountPrice = (int) totalCost;

        // 5. Comparison operator
        boolean isOver100 = totalCost > 100;

        // Display results
        System.out.println("Product Name: " + productName);
        System.out.println("Price: $" + price);
        System.out.println("Quantity: " + quantity);
        System.out.println("Total Cost: $" + totalCost);
        System.out.println("Whole Dollar Discount Price: $" + discountPrice);
        System.out.println("Is Total Over $100? " + isOver100);
    }
}