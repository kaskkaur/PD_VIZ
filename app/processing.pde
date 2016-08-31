Ball b;



void setup()
{
	size(500, 500);
	background(100);
}

// Runs repeatedly until exit() is called.




void draw()
{ 

	if (b == null) {

	b = new Ball(50, 50);

	}
	


}

// Class and constructor for the ball.

class Ball {
	int x, y;
	int yV;
	int gravity;

	Ball(int initX, int initY) {
		x = initX;
		y = initY;
		yV = 1;
		gravity = 1;
	}

	void draw() {

		ellipse(x, y, 20, 20);

	}

}