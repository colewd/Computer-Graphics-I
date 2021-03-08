Cole DiStasio
February 28, 2021
Computer Graphics I
Assignment 2

In Assignment 2 I was able to use my code from assigment 1 with only a few adjustments and successfully implemented all of the new reqirements without much trouble.
The animate button was almost identical to the loop I used in the first assignment. It used a few arrays that, when indexed through in the loop, assign a random color to the points, set a new # of points and shrink/expand the Gasket 10 times.
The display button displays the gasket using the # of points taken from the points slider and the color selected from the color picker. This was the most difficult part of the assignment because the frag-shader takes RGB values in decimal form from 0.0 to 1.0 but the HTML color picker uses and returns Hexidecimal.
To solve this I stored the Hex string and divided it into its R, G and B values that I then converted to an integer and from there to decimal where it could then be used with the "fragment-shader."
The reset button simply resets the values in the color picker to red and sets the number of points and the point slider back to their default value of 5000.
The status updates prints out a message everytime the color is selected, the number of points are changed, or if the gasket has been displayed, animated or reset.

Bugs:
Similarly to in assignment 1 there is still a chance a color is randomly selected that could be white or so light that the points appear invisible. I didn't see this happen in all my testing but it should be a possibility.
Aside from that the only other issue I am still having is that there is no way to cancel the gasket being animated. You can still press display or clear while the animation is in progress and they will work correctly but then the animation will resume from where it left off. 
  