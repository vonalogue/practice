
import java.util.Scanner;

public class TicTacToe {

	public static Scanner input = new Scanner(System.in);

	public static char[][] board = new char[3][3];
	public static int player = 1;

	public static int row;
	public static int column;

	// Count consecutive elements
	public static int count = 1;

	// Count total turns taken
	public static int turn = 0;

	public static void main(String[] args) {

	boolean gameOn = true;


		// Set up the board with dots
		for (int y = 0; y < board.length; y++)
			for (int x = 0; x < board[y].length; x++)
				board[y][x] = '.';

		// Game loop
		while (gameOn) {

			if (count == 3) {
				if (player == 1)
					player = 2;
				else
					player = 1;
				System.out.println("Player " + player + " wins!");
				gameOn = false;
			}

			// If all possible turns have been taken and the board is filled
			// without three consecutive X's or O's, tie the game.

			for (int y = 0; y < board.length; y++) {

				for (int x = 0; x < board[y].length; x++) {

					if (count == 3)
						break;

					System.out.print(board[y][x]);

					for (int z = 1; z < 3; z++) {
						if (board[y][x] == 'X' || board[y][x] == 'O')
							if (
									(x + z <= 2 && board[y][x] == board[y][x + z]) 	||								// Row
									(y + z <= 2 && board[y][x] == board[y + z][x]) 	||								// Column
									(
											(x + z <= 2 && y + z <= 2 && board[y][x] == board[y + z][x + z]) || 	// Diagonal
											(y == 2 && x + z <= 2 && board[y][x] == board[y -z][x + z])				// Reverse
									)
								)
								count++;
							else
								count = 1;
					}
				}
				System.out.println();
			}
			if (count != 3) {
				if (turn == 9) {
					System.out.println("Draw game!");
				} else {
					turn++;
					playerTurn();
				}
			}
		}
	}



	public static void playerTurn() {

		char symbol = ' ';
		if (player == 1)
			symbol = 'X';
		else if (player == 2)
			symbol = 'O';

		System.out.println("**PLAYER " + player + "**");

		System.out.println("X (1-3): ");
		column = input.nextInt() - 1;

		System.out.println("Y (1-3): ");
		row = input.nextInt() - 1;

		if (column < 0 || column > 2 ||
			row < 0    || row > 2) {
			System.out.println("That's off the board!");
			playerTurn();
		}

		// If the space is already an X or an O
		if (board[row][column] != '.') {
			System.out.println("That space is TAKEN already!");
			playerTurn();
		} else {
			board[row][column] = symbol;
			if (player == 1)
				player = 2;
			else if (player == 2)
					player = 1;
		}
	}
}
