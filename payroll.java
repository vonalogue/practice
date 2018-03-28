import java.io.*;
import java.util.List;
import java.util.ArrayList;
import java.math.BigDecimal;

public class Payroll {

	// Each element contains an array of strings that corresponds to an employee.
	// A List object has been chosen to dynamically add new elements.

	// Each array is broken down as such, where x indicates the index of the
	// array in the List:

	// employees.get(x)[0]: Last name
	// employees.get(x)[1]: First name
	// employees.get(x)[2]: Pay rate
	// employees.get(x)[3]: Hours worked
	// employees.get(x)[4]: Gross pay

	private static List<String[]> employees = new ArrayList<String[]>();

	final static double tax = 0.15;

	// For handling a major issue: returning values with proper decimals,
	// specifically in the context of currency (cash money, baby. Yeah.).

	// Ideally, we shouldn't be using doubles, but, in this case, we have
	// to take the GIGO approach (garbage in, garbage out). Just kidding.

	/*
	public static double decimals(double d) {

	}

	*/

	public static void main(String[] args) throws IOException {

		// Temporarily store a line of data corresponding to an individual
		// employee as the reader object scans the file line-by-line in
		// the while loop below.
		String empData = null;

		// Count employees filed to determine the length of each array element
		// in the List and be able to refer to its indices when looping
		// through it.

		// We start at -1 to account for the last line break that the reader
		// object scans.
		int empCount = -1;

		// Take the contents of empData and store it in an array once they
		// have been split into individual tokens via the split() method.
		String[] emp;
		int length;

		// Totals
		double payTotal = 0,
			   hoursTotal = 0,
			   grossTotal = 0,
			   taxTotal = 0,
			   netTotal = 0;

		// Tax and net pay amounts; each index corresponds to the index of
		// the array that holds a specified employee's data in the List
		// object (e.g. taxAmounts[0] is derived from data in
		// employees.get(0), etc.).
		double[] taxAmounts;
		double[] netPayAmounts;

		// Create reader and writer objects for file input and output, respectively
		BufferedReader reader = new BufferedReader(
								new FileReader("c:/Documents and Settings/Leland/workspace/PAYROLL/src/payroll"));
		//FileWriter writer = new FileWriter("payrollOut");

		// As long as the reader object returns a string with the readLine() method,
		// split the string into tokens, using whitespace as the delimiter (indicated
		// by the regular expression "\\s+") and temporarily assign the resulting
		// array to emp index-by-index so as to "deep copy" the array's values and
		// avoid relying on references. Then, add the newly modified emp array to
		// the employees List object.

		while ((empData = reader.readLine()) != null) {
			length = empData.split("\\s+").length;
			emp = new String[length];

			for (int i = 0; i < length; i++) emp[i] = empData.split("\\s+")[i];
			employees.add(emp);
			empCount += 1;
		}
		reader.close();

		// Now that we know how many employees there are, we can indicate the
		// dimensions of these arrays, which provide additional required
		// information. They are parallel to the existing employee arrays.
		taxAmounts = new double[empCount];
		netPayAmounts = new double[empCount];

		// Alphabetically sort the employee arrays by last name in descending
		// order before we run calculations.
		for (int i = 0; i < empCount; i++) {
			if (i + 1 > empCount) break; // Avoid going out of bounds

			String[] temp = new String[employees.get(i).length];
			if (empUtil.lastName(employees, i).compareTo
			   (empUtil.lastName(employees, i + 1)) < 0) { // When compareTo returns a negative value, it means that the
														   // former String argument is lexicographically greater than
														   // the latter.
				empUtil.set(temp, employees.get(i));

				empUtil.set(employees.get(i), employees.get(i + 1));
				empUtil.set(employees.get(i + 1), temp);
			}
		}



		// Calculate tax amounts, net pay amounts, and totals using static methods
		// in the empUtil class created for concise syntax and parsing data types.
		for (int i = 0; i < empCount; i++) {
			taxAmounts[i]    = empUtil.gross(employees, i) * tax;
			netPayAmounts[i] = empUtil.gross(employees, i) - taxAmounts[i];

			payTotal 	+= empUtil.payRate(employees, i);
			hoursTotal 	+= empUtil.hours  (employees, i);
			grossTotal 	+= empUtil.gross  (employees, i);

			taxTotal 	+= taxAmounts[i];
			// Round to two decimal places

			netTotal 	+= netPayAmounts[i];


		} // end for

		PrintWriter printer = new PrintWriter("payrollOut");

		for (int i = 0; i < empCount; i++) {
			for (int j = 0; j < employees.get(i).length; j++)	{
				printer.print(employees.get(i)[j]);

				if (j == 0) printer.print(" ");		// If the last name has just been printed, add a space after it.
				else { printer.print("\t"); }		// Otherwise, by default, add a tab.
			}

			// Columns for tax and net pay amounts
			printer.print("\t");
			printer.print(taxAmounts[i]);
			printer.print("\t");
			printer.print(netPayAmounts[i]);

			printer.println();

		} // end for

		printer.close();


		// Console output to test contents of the List
		for (int i = 0; i < empCount; i++) {
			for (int j = 0; j < employees.get(i).length; j++){
				System.out.println(employees.get(i)[j]);
			}
		} // end for


	} // end main
}	  // end Payroll
