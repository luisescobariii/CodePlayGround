public class TL3_1{
    
    public TL3_1(){
        Console.println("\n" + "Se creara un vector de 15 elementos.");
        IntVector vector = new IntVector(15);
        vector.fill();
        Console.println("El vector ingresado es:");
        vector.print();
        Console.loadExercise();
    }
}