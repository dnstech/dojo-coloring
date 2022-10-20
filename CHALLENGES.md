# Challenges for everyone
Here's a list of challenges to work on if you like

## Getting started challenge
For anyone who has not been familar with development, they will surely need to set up the dev environment on their computer. Here's a challenge for you: Setting up dev environment and make the code build and run!

What you will need:
1. GIT version control
2. An IDE, with appropriate plugins (Such as VSCode with Typescript plugins, EditorConfig, VSCode-icons, prettier, GitLens)
3. NodeJS
4. (Possibly) Code compilation tool (if you're on Windows, Microsoft Build Tools)

## About the board
You are given an Interface `IRoom` like this:

``` typescript
interface IRoom {
  rowCount: number;
  colCount: number;

  getBoundingBox(): DOMRect;
  color(row: number, col: number, fillColor: number = -1): boolean;
  reset();
}
```

You will need to implement the `Solution.ts` methods for the following challenges, using the `color()` function. This function accept a `row` and a `col`, which denotes a cell on the board, and an optional `fillColor`. If you don't pass any `fillColor` it will use a random one, if you pass a number it will make sure that same number will be matched to same color. As the name says, the function will color a cell.

It will return `true` if the coloring was successful and `false` otherwise.

It runs synchronously in the current event loop. So, give it a bit of time to draw the cell if you want to see the action.

## Itermediate challenge
For anyone who has got the project up an running. Here's a challenge for you: Can you color a cell on the board by mouse? I.e. click on a cell will color it

## Advanced challenge
Can you color all the space on the board when the button is clicked? Cells which are belonged to a same area should be colored the same (i.e. adjacent cells), in other words, each enclosed area should be colored the same.

**Additional challenge:** You will need to give the `room.color` function a little break for it to draw a cell on the board. Can you code in a way the animation can happen smoothly?