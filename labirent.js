const map = 
[
    [0, 0, 0 ,0, 0, 0],
    [0, 0, 0 ,0, 0, 0],
    [0, "start", 0 ,0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],

]
const nodes = new Map();

const createMap = function karte(map)
{
    let xi;
    let yi;
    for (const [indexX, x] of map.entries())
    {
        for (const [indexY, y] of x.entries())
        {
            y != "start" ? nodes.set(`${indexX}${indexY}`, false) :  nodes.set(`${indexX}${indexY}`, true);

            if ( y === "start"){
                xi = indexY;
                yi = indexX;
            }
        }
    }

    return [yi, xi, map];
}

let start = createMap(map);

console.log("--");
const allanswer = [];

const simplinx = function dfs(currentPos, visited = new Map(), map = [], step = 1, answer = [])
{


  const currentVisited = new Map(visited);

  let strY = String(currentPos[0]);
  let strX = String(currentPos[1]);


  let X = currentPos[1];
  let Y = currentPos[0];

  currentVisited.set(`${strY}${strX}`, true);

  const [up, down, right, left] = [[-1,0], [1, 0], [0, 1], [0, -1]];
  const moves = [right, up, left, down];


  for (const [y, x] of moves)
  { 
      const currentMap = map.slice();

      X = currentPos[1];
      Y = currentPos[0];
      
      X += x;
      Y += y;

      if (Y > map.length - 1 || Y < 0) {
          continue;
      }

      if (X > map[0].length - 1 || X < 0){
          continue;
      }
      
      currentMap[Y-y][X-x] = step


      if (currentMap[Y][X] === 1 && [...currentVisited.values()].every(val => val === true)){
            console.log("cevap !!!");
            map.forEach(element =>
                 {
                console.log(element);
                });
            
                answer.push(...[map]);
                allanswer.push(...[currentMap]);
            
            
    }

      if (!currentVisited.get(`${String(Y)}${String(X)}`)){
        
        dfs([Y, X], currentVisited, currentMap, step + 1, answer)
      }
      
      currentMap[Y-y][X-x] = 0
  }

  
}

const selectedMap = start[2]

let answers = simplinx(start, nodes, selectedMap);


