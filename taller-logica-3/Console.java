import java.util.Scanner;

class Console{
	
	static Scanner in = new Scanner(System.in);
	
	public static void returnToMenu(){
	    print("\n" + "Presione una tecla para regresar al Menu...");
	    in.nextLine();
	    new TallerLogica3();
	}
	
	public static void print(Object obj){System.out.print(obj);}
	
	public static void println(Object obj){System.out.println(obj);}
	
	public static String readString(){return in.next();}
	
	public static int readInt(){
	    int input = 0;
	    try{input = Integer.parseInt(in.next());}
	    catch(Exception e){
	        println("Error: Ingrese un valor de tipo entero");
	        readInt();
	    }
	    return input;
	}
	
	public static float readFloat(){
	    float input = 0;
	    try{input = Float.parseFloat(in.next());}
	    catch(Exception e){
	        println("Error: Ingrese un valor de tipo real");
	        readFloat();
	    }
	    return input;
	}
}