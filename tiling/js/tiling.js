
// (1) study this code
// (2) experiment with this code
// (3) modify this code creatively
//     to drawn your own pictures

// start here by experimenting with
// different values of SIZE_OF_HEXAGON

// then redefine the functions at the
// bottom of the file:
//  colorFunction()
//  shiftFunction()
//  rotationFunction()
//  scalingFunction()
// search in the code for "you might find this function useful"
// and "try something different!"

// the radius of the smallest circle
// in which a hexagon will fit (before
// its vertices are moved)
var SIZE_OF_HEXAGON = 0.18;

// a small number to use in
// comparing floating point values
var EPSILON = 1E-8;

// define the limits of the region
// in which program will draw figures
// (coordinates given in world coordinates)
var xMin = -1.0;
var yMin = -1.0;
var xMax =  1.0;
var yMax =  1.0;

// define a function of two floating point numbers
// that returns a function of  one floating point
// number
function makeIntervalChecker( minimum, maximum ) {
  return function intervalChecker( x ) {
    return (minimum <= x) && (x <= maximum);
  }; // intervalChecker()
}; // makeIntervalChecker()

// construct boolean functions of one floating
// point number
var xChecker = makeIntervalChecker( xMin, xMax );
var yChecker = makeIntervalChecker( yMin, yMax );

// define a function 
function makeRegionChecker( xChecker, yChecker ) {
  return function regionChecker( x, y ) {
    return xChecker(x) && yChecker(y);
  }; // regionChecker()
}; // makeRegionChecker()

// construct a boolean function of two floating
// point numbers
var xyChecker = makeRegionChecker( xChecker, yChecker );

// a function to create an object
// that models a point in the plane
function point( x, y ) {
  var private = {};
  private.x = x;
  private.y = y;

  var public = {};

  public.getX = function() {
    return private.x;
  }; // getX()

  public.getY = function() {
    return private.y;
  }; // getY()

  public.setX = function( x ) {
    private.x = x;
  }; // setX()

  public.setY = function( y ) {
    private.y = y;
  }; // setY()

  public.isApproximatelyEqual = function( p ) {
    var xEqual = Math.abs( private.x - p.getX() ) < EPSILON;
    var yEqual = Math.abs( private.y - p.getY() ) < EPSILON;
    return xEqual && yEqual;
  }; // isApproximatelyEqual()

  public.compareTo = function( p ) {
    var result = 0;

    var x0 = private.x;
    var y0 = private.y;
    var x1 = p.getX();
    var y1 = p.getY();

    if( (x1 >= x0) && (y1 >= y0) ) {
      result = 1;
    } // if
    else if( (x1 < x0) && (y1 >= y0) ) {
      result = 2;
    } // else if
    else if( (x1 < x0) && (y1 < y0) ) {
      result = 3;
    } // else if
    else {
      // (x1 >= x0) && (y1 < y0)
      result = 4;
    } // else

    return result;
  }; // compareTo()

  public.toString = function() {
    return "(" + private.x + ", " + private.y + ")";
  }; // toString()

  return public;
}; // point()

// a function to create an object
// that models a line segment
function edge( tail, head ) {
  var private = {};
  private.tail = tail;
  private.head = head;
  private.midpoint = point( (tail.getX() + head.getX())/2,
      (tail.getY() + head.getY())/2 );

  var public = {};
  public.getTail = function() {
    return private.tail;
  }; // getTail()

  public.getHead = function() {
    return private.head;
  }; // getHead()

  public.getMidpoint = function() {
    return private.midpoint;
  }; // getMidpoint()

  public.isApproximatelyEqual = function( e ) {
    return private.midpoint.isApproximatelyEqual( e.getMidpoint() );
  }; // isApproximatelyEqual()

  public.compareTo = function( e ) {
    return private.midpoint.compareTo( e.getMidpoint() );
  }; // compareTo()

  return public;
}; // edge()

// a function that creates an object
// that models a 6-sided polygon
function hexagon( center, v0, v1, v2, v3, v4, v5 ) {
  var private = {};
  private.center = center;
  private.vertices = [];
  private.vertices.push( v0 );
  private.vertices.push( v1 );
  private.vertices.push( v2 );
  private.vertices.push( v3 );
  private.vertices.push( v4 );
  private.vertices.push( v5 );

  var public = {};
  public.getCenter = function() {
    return private.center;
  }; // getCenter()

  public.getVertex = function( index ) {
    return private.vertices[index];
  }; // getVertex()

  public.isApproximatelyEqual = function( e ) {
    return private.center.isApproximatelyEqual( e.getCenter() );
  }; // isApproximatelyEqual()

  public.compareTo = function( e ) {
    return private.center.compareTo( e.getCenter() );
  }; // compareTo()

  return public;
}; // hexagon()

/************************************************/
/*
// test point function
var p0 = point( 0, 0 );
var p1 = point( 1, 1 );
var p2 = point( 2, 2 );
var p3 = point( 3, 3 );
var p4 = point( 4, 4 );

var v2 = point( 2, 2 );

console.log( "p0 = " + p0.toString() );
console.log( "p0.x = " + p0.getX() );
console.log( "p0.y = " + p0.getY() );
console.log( "p1 = " + p1.toString() );
console.log( "p1.x = " + p1.getX() );
console.log( "p1.y = " + p1.getY() );
console.log( p2.toString() + " = " + v2.toString() + "? " + 
  p2.isApproximatelyEqual( v2 ) );
console.log( p2.toString() + " = " + p1.toString() + "? " + 
  p2.isApproximatelyEqual( p1 ) );

p1.setX(  1 );
p1.setY(  1 );
p2.setX( -1 );
p2.setY(  1 );
p3.setX( -1 );
p3.setY( -1 );
p4.setX(  1 );
p4.setY( -1 );

console.log( p1.toString() + " is in quadrant " + p0.compareTo( p1 ) );
console.log( p2.toString() + " is in quadrant " + p0.compareTo( p2 ) );
console.log( p3.toString() + " is in quadrant " + p0.compareTo( p3 ) );
console.log( p4.toString() + " is in quadrant " + p0.compareTo( p4 ) );
*/
/************************************************/

// a function to create an object
// that models a node in a linked
// list---the node can contain any
// kind of data (its "element")
function node( element, next ) {
  var private = {};

  private.element = element;
  private.next = next;

  var public = {};
  public.getElement = function() {
    return private.element;
  }; // getElement()

  public.getNext = function() {
    return private.next;
  }; // getNext()

  return public;
}; // node()

/************************************************/
/*
var h = node( p0, null );
h = node( p1, h );
h = node( p2, h );
h = node( p3, h );
h = node( p4, h );

console.log( "Follow links in linked list." );
console.log( "Node 0 (head): " + h.getElement().toString() );
console.log( "Node 1: " + h.getNext().getElement().toString() );
console.log( "Node 2: " + h.getNext().getNext().getElement().toString() );
console.log( "Node 3: " + h.getNext().getNext().getNext().getElement().toString() );
console.log( "Node 4: " + h.getNext().getNext().getNext().getNext().getElement().toString() );
*/
/************************************************/

// a function to create an object
// that models a singly linked list
// elements must have an "isApproximatelyEqual()"
// function to compare themselves to other
// elements
function list() {
  var private = {};
  private.head = null;
  private.size = 0;

  var public = {};

  // return true if list is not empty,
  // false otherwise
  public.isEmpty = function() {
    return private.head === null;
  }; // isEmpty()

  // add an element to the list
  public.add = function( element ) {
    private.head = node( element, private.head );
    private.size++;
  }; // add()

  // return the elements in the
  // list in an array
  public.getArray = function() {
    var result = [];

    var current = private.head;
    while( current !== null ) {
      result.push( current.getElement() );
      current = current.getNext();
    } // while

    return result;
  }; // getArray()

  // return number of elements
  // in the list
  public.getSize = function() {
    return private.size;
  }; // getSize()

  // return an element from the list
  // if the list contains the element,
  // return null otherwise
  public.get = function( element ) {
    if( private.head === null ) {
      return null;
    } // if
    else {
      var found = false;
      var current = private.head;
      var currentElement = null;

      while( !found && current !== null ) {
        currentElement = current.getElement();
        found = currentElement.isApproximatelyEqual( element );
        current = current.getNext();
      } // while

      if( found ) {
        return currentElement;
      } // if
      else {
        return null;
      } // else
    } // else
  }; // get()

  // return true if list contains a given
  // element, false otherwise
  public.isElement = function( element ) {
    if( private.head === null ) {
      return false;
    } // if
    else {
      var found = false;
      var current = private.head;

      while( !found && current !== null ) {
        found = current.getElement().isApproximatelyEqual( element );
        current = current.getNext();
      } // while

      return found;
    } // else
  }; // isElement()

  // print a representation of each
  // element in the list in the console
  public.trace = function() {
    var current = private.head;
    while( current !== null ) {
      console.log( current.getElement().toString() );
      current = current.getNext();
    } // while
  }; // trace()

  return public;
}; // list()

var store = list();

/************************************************/
/*
console.log( "Is list empty? " + store.isEmpty() );

store.add( p4 );
store.add( p3 );
store.add( p2 );
store.add( p1 );
store.add( p0 );

console.log( "size of list = " + store.getSize() );

store.trace();
*/
/************************************************/

// a function to create an object that
// models a set (a collection with no
// duplicate elements)
function bank() {
  var private = {};
  private.vault = list();

  var public = {};

  public.getArray = function() {
    return private.vault.getArray();
  }; // getArray()

  // return an element from the bank
  // if element is not already in the bank,
  // add it to the bank
  public.get = function( element ) {

    var elementFromVault = private.vault.get( element );

    if( elementFromVault !== null ) {
      return { value: elementFromVault, isNewElement: false };
    } // if
    else {
      private.vault.add( element );
      return { value: element, isNewElement: true };
    } // else

  }; // get()

  public.getSize = function() {
    return private.vault.getSize();
  }; // getSize()

  public.trace = function() {
    private.vault.trace();
  }; // trace()

  return public;
}; // bank()

/************************************************/
/*
var safe = bank();
console.log( "Trace of empty bank." );
safe.trace();

var e = safe.get( p2 );
console.log( "Trace of bank that contains p2." );
safe.trace();

e = safe.get( p4 );
console.log( "Trace of bank that contains p2 and p4." );
safe.trace();

e = safe.get( p1 );
console.log( "Trace of bank that contains p2, p4, and p1." );
safe.trace();

e = safe.get( p2 );
console.log( "Trace of bank that contains p2, p4, and p1." );
safe.trace();

console.log( "number of distinct values in bank = " + safe.getSize() );
*/
/************************************************/

// specify where in the HTML page the picture
// will be drawn
var elem = document.getElementById('tiling');

// specify the size of the picture
var two = new Two({ width: 512, height: 512}).appendTo( elem );

// a function to create an object
// that contains polygons that fill
// a region in the plane
var makeTiles = function() {
    var bankOfVertices = bank();
    var bankOfEdges = bank();
    var bankOfPolygons = bank();
    var bankOfPolygonCenters = bank();

    // define the boundaries of the rectangular
    // region of the plane in which picture will
    // be drawn---these are world coordinates which
    // will later be translated to device (pixel)
    // coordinates
    var xMin = -1.0;
    var xMax =  1.0;
    var yMin = -1.0;
    var yMax =  1.0;

    var majorRadius = SIZE_OF_HEXAGON;
    //var minorRadius = 0.8 * majorRadius;
    var innerRadius = majorRadius * Math.cos( Math.PI/6 );
    var numberOfSides = 6;

    // return true if a hexagon will be within
    // the picture-drawing area, false otherwise
    var inBounds = function( pointInPlane ) {
      var x = pointInPlane.getX();
      var y = pointInPlane.getY();

      var leftTest = x > xMin + majorRadius;
      var rightTest = x < xMax - majorRadius;
      var bottomTest = y > yMin + majorRadius;
      var topTest = y < yMax - majorRadius;
      return leftTest && rightTest && bottomTest && topTest;
    }; // inBounds()

    var angle = 0;
    var x = 0;
    var y = 0;

    // create a hexagon (if it is within bounds)
    // and recursively call the function to create
    // the hexagon's six neighbors
    var makeHexagon = function( centerOfHexagon ) {
      var isNewCenter = bankOfPolygonCenters.get( centerOfHexagon ).isNewElement;

      if( isNewCenter && inBounds( centerOfHexagon )  ) {
          var xc = centerOfHexagon.getX();
          var yc = centerOfHexagon.getY();

          var vertices = [];

          var i;
          for( i = 0; i < 6; i++ ) {
              var angle = (i/6) * 2 * Math.PI;
              var xCoordinate = xc + majorRadius * Math.cos( angle );
              var yCoordinate = yc + majorRadius * Math.sin( angle );
              var vertex = point( xCoordinate, yCoordinate );
              vertex = bankOfVertices.get( vertex ).value;
              vertices.push( vertex );
          } // for

          var v0 = vertices[0];
          var v1 = vertices[1];
          var v2 = vertices[2];
          var v3 = vertices[3];
          var v4 = vertices[4];
          var v5 = vertices[5];
          var h = hexagon( centerOfHexagon, v0, v1, v2, v3, v4, v5 );
          var p = bankOfPolygons.get( h ).value;


          var e = edge( v0, v1 );
          e = bankOfEdges.get( e );
          e = edge( v1, v2 );
          e = bankOfEdges.get( e );
          e = edge( v2, v3 );
          e = bankOfEdges.get( e );
          e = edge( v3, v4 );
          e = bankOfEdges.get( e );
          e = edge( v4, v5 );
          e = bankOfEdges.get( e );
          e = edge( v5, v0 );
          e = bankOfEdges.get( e );

          for( i = 0; i < 6; i += 1 ) {
              angle = (i/6) * 2 * Math.PI;
              angle += Math.PI/6;
              xCoordinate = xc + 2.0 * innerRadius * Math.cos( angle );
              yCoordinate = yc + 2.0 * innerRadius * Math.sin( angle );
              centerOfNeighbor = point( xCoordinate, yCoordinate );

              makeHexagon( centerOfNeighbor );
          } // for
      } // if
    }; // makeHexagon()

    // create a tiling (an assembly of hexagons)
    // by drawing the first at the center of the
    // picture drawing area, then (through recursive
    // calls) drawing all neighbors until the area
    // is filled with hexagons
    var centerOfFirstHexagon = point( 0, 0 );
    makeHexagon( centerOfFirstHexagon );

    // return an object that contains 3 arrays
    return { 
        polygons: bankOfPolygons.getArray(),
        edges: bankOfEdges.getArray(),
        vertices: bankOfVertices.getArray()
    } ;
}; // makeTiles()

// from an array of hexagons, create the data structures
// with which the two.js  library works
// color each hexagon, perturb the locations of its vertices,
// rotate the hexagon, and scale the hexagon using the
// parameters (4 functions of x and y) 
var makeGroup = function( colorFunction, shiftFunction, rotationFunction,
    scalingFunction ) {
  var groupOfHexagons = two.makeGroup();

  var t = makeTiles();

  var vertices = t.vertices;
  for( var i = 0; i < vertices.length; i++ ) {
      var p = vertices[i];

      var offset = shiftFunction( p.getX(), p.getY() ); 

      p.setX( p.getX() + offset.getX() );
      p.setY( p.getY() + offset.getY() );
  } // for 

  var tiles = t.polygons;

  for( var i = 0; i < tiles.length; i++ ) {
    var hexagon = tiles[i];
    var anchors = [];
    for( var j = 0; j < 6; j++ ) {
      var p = hexagon.getVertex(j);

      anchors.push( new Two.Anchor( p.getX(), p.getY() ) );
    } // for

    var path = two.makePath( anchors, true, false );
    var cx = hexagon.getCenter().getX();
    var cy = hexagon.getCenter().getY();
    path.fill = colorFunction( cx, cy ); 
    path.stroke = "#88AAFF";
    path.linewidth = 0.01;
    path.rotation = rotationFunction( cx, cy );
    path.scale = scalingFunction( cx, cy );
    groupOfHexagons.add( path );
  } // for

  return groupOfHexagons;
}; // makeGroup()

// you might find this function useful

// return the weighted average of 2 numbers
// a and b (t is the weight---a number in the
// range 0.0 to 1.0)
var weightedAverage = function( a, b, t ) {
  return (1 - t) * a + t * b;
}; // weightedAverage()

// return a scaled distance (0.0 to 1.0)
// of a point from the center of a drawing
// area whose center is at (0.0, 0.0) and 
// that is bounded by a square whose lower
// left corner is at (-1.0, -1.0) and upper
// right corner is at (+1.0, +1.0)
var scaledDistance = function( x, y ) {
  return Math.sqrt(x * x + y * y)/Math.sqrt(2.0);
}; // scaledDistance()

// a function to determine the color of
// a hexagon whose center is at (x,y)
var colorFunction = function( x, y ) {
  // you might find this function useful
  var rgbColor = function( red, green, blue ) {
    return "rgb(" + red + ", " + green + ", " + blue + ")";
  }; // rgbColor()

  // you might find this function useful
  var randomColor = function() {
    var red = Math.trunc(128 + 128 * Math.random());
    var green = Math.trunc(128 + 128 * Math.random());
    var blue = Math.trunc(128 + 128 * Math.random());

    return rgbColor( red, green, blue );
  }; // randomColor()

  // try something different!
  return rgbColor( 224, 206, 192 );
}; // colorFunction()

// a function to perturb the coordinates of
// a vertex that is at (x,y)
var shiftFunction = function(x, y) {
  // you might find this function useful here
  var randomPointInCircle = function( radius ) {
    var x = 0;
    var y = 0;

    var distance = 0;

    var found = false;
    while( !found ) {
      x = radius * Math.random();
      y = radius * Math.random();
      distance = Math.sqrt(x * x + y * y);
      found = distance < radius; 
    } // while

    return point(x, y);
  }; // randomPointInCircle()

  // for now, no shifting
  // try something different!
  return point(0,0);
}; // shiftFunction()

// return an angle (0 to 2 * PI radians)
// by which a hexagon is to be rotated
var rotationFunction = function( x, y ) {
  // for now, no rotation
  // try something different!
  return 0.0;
}; // rotationFunction()

// return a scale (0.0 to 1.0) by which
// the size of a hexagon is to be adjusted
var scalingFunction = function( x, y ) {
  // for now, no scaling
  // try something different
  return 1.0;
}; // scalingFunction()

var picture = makeGroup( colorFunction, shiftFunction,
  rotationFunction, scalingFunction );

picture.scale = two.width/2;
picture.translation.set( two.width/2, two.height/2 );

two.update();

