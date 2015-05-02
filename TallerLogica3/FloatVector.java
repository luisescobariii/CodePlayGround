public class FloatVector{
    
    public float[] v;
    
    //Constructor: Crea un vector de reales de tamano 'n'
    public FloatVector(int n){v = new float[n];}
    
    //Llena los valores del vector con valores ingresados por el usuario
    public void fill(){
        for(int i = 0 ; i < v.length; i++){
            Console.print("Ingrese el dato del vector en posicion " + i + ": ");
            v[i] = Console.readFloat();
        }
    }
    
    //Imprime el vector
    public void print(){for(float i : v){Console.print("[" + i + "]");}}
}