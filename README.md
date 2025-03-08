# Convex Hull Visualizer

A simple interactive web application to visualize the Convex Hull algorithm using JavaScript and HTML5 Canvas.

## What is a Convex Hull?

The convex hull of a set of points is the smallest convex polygon that encloses all the points. Think of it as stretching a rubber band around the points - the shape it forms is the convex hull.

## How to Use

1. Open `index.html` in a web browser
2. Click anywhere on the canvas to add points
3. Press the `Enter` key to toggle the display of the convex hull
4. Add more points to see how the convex hull changes dynamically

## Implementation Details

This application implements the Graham Scan algorithm for finding the convex hull:

1. Find the point with the lowest y-coordinate (and leftmost if tied)
2. Sort all points by polar angle relative to the pivot point
3. Build the hull by examining triplets of points and ensuring counterclockwise turns

## Technical Details

- Implementation uses pure JavaScript with HTML5 Canvas for rendering
- Vector mathematics and drawing utilities from custom built [Library.js module](https://github.com/UmarAdam9/JavaScript-2D-game-dev-Library)
- No external dependencies required

## Features

- Real-time point plotting with mouse clicks
- Dynamic convex hull calculation and visualization
- Simple user interface
