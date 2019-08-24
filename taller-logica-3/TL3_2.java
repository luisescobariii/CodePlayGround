public class TL3_2{
    
    public TL3_2(){
        Console.print("Ingrese la cantidad de elementos del vector a crear: ");
        IntVector vector = new IntVector(Console.readInt());
        vector.fill();
        Console.println("El vector ingresado es:");
        vector.print();
        
        Console.println("\n" + "El valor mayor es: " + vector.largest);
        
        int[] pos = vector.positions(vector.largest);
        if(vector.repeats(vector.largest) > 1){
            Console.println("Se repite " + vector.repeats(vector.largest) + " veces");
            Console.print("En las posiciones ");
            for(int i = 0; i < pos.length - 1; i++){
                Console.print(pos[i] + ", ");
            }
            Console.println(pos[pos.length - 1]);
        }else{
            Console.println("No se repite, solo se encuetra en la posicion " + pos[0]);
        }
        
        if(vector.multiplesOf(3) != null){
            int[] mul = vector.multiplesOf(3);
            if(mul.length > 1){
                Console.print("Los multiplos de 3 son ");
                for(int i = 0; i < mul.length - 1; i++){
                    Console.print(mul[i] + ", ");
                }
                Console.println(mul[mul.length - 1]);
            }else{
                Console.println("El unico multiple de 3 es " + mul[0]);
            }
        }else{
            Console.print("No existen multiplos de 3");
        }
        Console.loadExercise();
    }
}