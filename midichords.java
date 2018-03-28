// MIDI program that makes music happen, baby! WOO!
// (c) 2013 Dennis Golanov

import javax.sound.midi.*;
import java.util.*;

public class Chords
{
	public static final Scanner input = new Scanner( System.in );

	public static int measureLen;
	public static String scaleType;

	public static final int[] MAJORSTEPS = { 2, 2, 1, 2, 2, 2, 1 };
	public static final int[] MINORSTEPS = { 2, 1, 2, 2, 1, 2, 2 };
									  //	   0  1  2  3  4  5  6

	public static final String[] MAJORCHORDS = { "major", "minor", "minor", "major", "major", "minor", "dim" };
	public static final String[] MINORCHORDS = { "minor", "dim", "major", "minor", "minor", "major", "major" };
										     //    0		1		2		 3		  4	       5		6

	public static final Map<String, Integer> NOTES;
	static {
		NOTES = new HashMap<String, Integer>();
		NOTES.put( "C",  0 );
		NOTES.put( "C#", 1 );
		NOTES.put( "D",  2 );
		NOTES.put( "D#", 3 );
		NOTES.put( "E",  4 );
		NOTES.put( "F",  5 );
		NOTES.put( "F#", 6 );
		NOTES.put( "G",  7 );
		NOTES.put( "G#", 8 );
		NOTES.put( "A",  9 );
		NOTES.put( "A#", 10 );
		NOTES.put( "B",  11 );
	}


	public static Player player;

	public void play( int instrument,
					  int note,
					  int octave,
					  int[] prog,
					  int measure,
					  String type,
					  boolean arp ) throws Exception
	{
		    measureLen = measure * 8;
			scaleType = type;
			int timePos = 1;
			int rootNote;

			int[] keys = new int[7];
			keys[0] = note;
			int totalSteps = note;

			for ( int x = 1; x < 7; x++ ) {																// Create scale
					if  ( scaleType.equals("major") ) {
						totalSteps += MAJORSTEPS[x - 1];
						keys[x] = totalSteps;
				} else if ( scaleType.equals("minor") ) {
						totalSteps += MINORSTEPS[x - 1];
						keys[x] = totalSteps;
				}
			}

			for ( int x = 0; x < prog.length; x++ ) {													// Play chords
				rootNote = keys[prog[x] - 1];
					if 		( scaleType.equals("major"))  type = MAJORCHORDS[prog[x] - 1];
					else if ( scaleType.equals("minor"))  type = MINORCHORDS[prog[x] - 1];
				new Chord( instrument, rootNote, timePos, type, arp  );
					if ( arp == true ) timePos += measureLen + 1;
					else timePos += 3;
			}
	 } // End play()


	public static void main(String[] args) throws Exception
	{
		Chords app  = new Chords();

			System.out.println( "***WELCOME TO HITMAKER!***" );
			System.out.println( "Instrument (1-104): " );

		int instrument = input.nextInt();

			System.out.println( "Octave (0-8): " );

		int octave = input.nextInt();

			System.out.println( "Scale (Enter beginning note in format C or C#, etc. Use only sharp notation. Capitalize.): " );

		String sNote = input.next();
		int note = NOTES.get(sNote) + ( 12 * octave );

			System.out.println( "Chord progression (in the format \"1-3-5\"): " );

		String sProg = input.next();

		int[] prog = new int[sProg.split("-").length];
		for ( int x = 0; x < sProg.split("-").length; x++ ) prog[x] = Integer.parseInt( sProg.split("-")[x] );

			System.out.println( "Measure length: " );

		int measure = input.nextInt();

			System.out.println( "Chord type (major/minor): " );

		String type = input.next();

			System.out.println( "Arpeggiate? (y/n)" );

		String Sarp = input.next();
		boolean arp = false;

		if      ( Sarp.equals("y") ) arp = true;
		else if ( Sarp.equals("n") ) arp = false;

		Chords.player = new Player();
		app.play( instrument, note, octave, prog, measure, type, arp );

		again();

	} // End main()

	private static void again() throws Exception
	{
		String again;

		while ( true )
		{
			System.out.println("Again? (y/n) ");
			again = input.next();

			if 		( again.equals("y") ) main(null);
			else if ( again.equals("n") ) {
				System.out.println( "Later!" );
				System.exit(0);
			}
			else {
				System.out.println( "What the hell does " + "\"" + again +  "\"" + " mean?" );
				continue;
			}
		}
	} // End again()
} // End class Chords


class Chord
{
	public Chord( int instrument, int note, int position, String type, boolean arp ) throws Exception
	{
		int increment = 0;
		String noteName = "";

		if ( type.equals("dim") ) {
			System.out.println( "diminished chord playing...");
		}
		else { System.out.println( type + " chord playing..." ); }

		for ( int x = 0; x < 3; x++ )
		{
			ShortMessage inst  = new ShortMessage();
			inst.setMessage( 192, 1, instrument, 0 );      											// Event 192: set instrument

			MidiEvent setInstrument = new MidiEvent( inst, position );

			Chords.player.track.add( setInstrument );

			/************************************************************************/

			ShortMessage chordNote = new ShortMessage();	  	   									// The note to play

			if ( type.equals( "major" )) {
				if ( x == 1 ) increment = 4;
				else if ( x == 2 ) increment = 7;    // 4 + 3 = 7
			} else if ( type.equals( "minor" )) {
				if ( x == 1 ) increment = 3;
				else if ( x == 2 ) increment = 7;    // 3 + 4 = 7
			} else if ( type.equals( "dim" )) {
				if ( x == 1 ) increment = 3;
				else if ( x == 2 ) increment = 6;    // 3 + 3 = 6
			}

			chordNote.setMessage( 144, 1, note + increment, 120 );									// Parameters: note on, channel 1, note, velocity 120

			if ( arp == true ) position += 3 * x;
			MidiEvent noteOn = new MidiEvent( chordNote, position );

			Chords.player.track.add( noteOn );

			for ( String name : Chords.NOTES.keySet() ) {
				if ( Chords.NOTES.get(name) == ( note + increment ) % 12 ) noteName = name;
			}

			System.out.println("Note " + ( x + 1 ) + ": " + noteName );

			/************************************************************************/

			ShortMessage off = new ShortMessage();
			off.setMessage( 128, 1, note + increment, 100 ); 											// Event 128: note off

			if ( arp == false ) position += Chords.measureLen;
			MidiEvent noteOff = new MidiEvent( off, (position + ( 3 * x ) + 3));

			Chords.player.track.add( noteOff );

			/************************************************************************/




		} // End for

		Chords.player.sequencer.setSequence( Chords.player.seq );
		Chords.player.sequencer.start();

	} // End public Chord()
} // End class Chord

class Player
{
	Sequencer sequencer;
	Sequence seq;
	Track track;
	MidiEvent event;

	public Player()
	{
		try
		{
			sequencer = MidiSystem.getSequencer();    // The sequencer itself

			sequencer.open();

			seq = new Sequence( Sequence.PPQ, 4 );	  // "Sequence" object (the song, basically)
			track = seq.createTrack();		          // "Track" object (an instrument channel)

			event = null;

		} catch( Exception e ) { System.out.println( "FAILED TO BUILD SEQUENCER!" );
		   					     e.printStackTrace(); }
	} // End Player()
} // End Player
