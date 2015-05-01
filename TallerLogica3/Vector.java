public class Vector{
    
    Object[] vector;
    Object largest, smallest;
    
    public Vector(int n){vector = new Object[n];}
    
    public void fill(){
        for(int i = 0 ; i < v.length; i++){
            Console.print("\n" + "Ingrese el dato del vector en posicion " + (i+1) + ": ");
            v[i] = Console.readInt();
        }
        largest = calculateLargest();
        smallest = calculateSmallest();
    }
    
    public void print(){for(Object i : vector){Console.print("[" + i + "]");}}
    
    Object calculateLargest(){
        Object temp = v[0];
        for(int i : v){if(i > temp){temp = i;}}
        return temp;
    }
    
    Object calculateSmallest(){
        Object temp = v[0];
        for(int i : v){if(i < temp){temp = i;}}
        return temp;
    }
}