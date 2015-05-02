public class IntVector{
    
    public int[] v;
    public int largest;
    
    //Constructor: Crea un vector de enteros de tamano 'n'
    public IntVector(int n){v = new int[n];}
    
    //Llena los valores del vector con valores ingresados por el usuario
    //Inicializa los atributos
    public void fill(){
        for(int i = 0 ; i < v.length; i++){
            Console.print("Ingrese el dato del vector en posicion " + i + ": ");
            v[i] = Console.readInt();
        }
        largest = calculateLargest();
    }
    
    //Imprime el vector
    public void print(){for(int i : v){Console.print("[" + i + "]");}}
    
    //Devuelve cuantas veces se repite 'value', null si no existe
    public int repeats(int value){int c = 0; for(int i : v){if(i == value){c++;}} return c;}
    
    //Devuelve un vector con las posiciones donde se encuentre 'value', null si no se encuentra
    public int[] positions(int value){
        int[] temp = new int[repeats(value)];
        if(temp.length > 0){ int j = 0;
            for(int i = 0; i < v.length; i++){
                if(v[i] == value){temp[j] = i; j++;}
            }
        }else{return null;}
        return temp;
    }
    
    //Devuelve un vector con los multiplos de 'value', null si no existen
    public int[] multiplesOf(int value){
        int[] temp; int c = 0;
        for(int i : v){if(i % value == 0){c++;}}
        if(c > 0){temp = new int[c];}
        else{return null;}
        c = 0;
        for(int i = 0; i < v.length; i++){if(v[i] % value == 0){temp[c] = v[i]; c++;}}
        return temp;
    }
    
    //Halla el valor mayor
    int calculateLargest(){
        int temp = v[0];
        for(int i : v){if(i > temp){temp = i;}}
        return temp;
    }
    
    //Devuelve true si 'value' es par
    public boolean isEven(int value){ return (value % 2 == 0)? true : false;}
}