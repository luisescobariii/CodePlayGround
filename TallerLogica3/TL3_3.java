public class TL3_3{
    
    public TL3_3(){
        Console.print("Ingrese la cantidad de elementos del vector a crear: ");
        FloatVector vector = new FloatVector(Console.readInt());
        vector.fill();
        Console.println("El vector ingresado es:");
        vector.print();
        
        float evens = 0, odds = 0;
        for(int i = 0; i < vector.v.length; i++){
            if(i % 2 == 0){evens += vector.v[i];}
            else{odds += vector.v[i];}
        }
        
        Console.println("Los elementos en posiciones pares suman " + evens);
        Console.println("Los elementos en posiciones impares suman " + odds);
        
        Console.loadExercise();
    }
}