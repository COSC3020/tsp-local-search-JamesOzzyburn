function tsp_ls(distance_matrix) {
    let betterRoute = true;
    let len = distance_matrix.length;

    //Make and randomize the route
    let route = Array.from(Array(len).keys());
    route = genRandomRoute(route);

    //This block of code just runs the function over and over again until it cannot find a better route
    while (betterRoute) {
        betterRoute = false;
        for (let i = 0; i < len - 1; i++) {
            for (let k = i + 1; k < len; k++) {
                let newRoute = twoOptSwap(route, i , k);
                if (routeDist(newRoute) < routeDist(route)) {
                    route = newRoute;
                    betterRoute = true;
                }
            }
        }
    }

    //Function that gets the distance of a route
    function routeDist(route) {
        let distance = 0;
        for (let i = 0; i < route.length - 1; i++) {
            distance += distance_matrix[route[i]][route[i+1]];
        }
        return distance;
    }
    return routeDist(route);
}

//To get a randomized/shuffled list I used code from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function genRandomRoute(route) {
    let currentIndex = route.length;
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [route[currentIndex], route[randomIndex]] = [route[randomIndex], route[currentIndex]];
    }
    return route;
}

function twoOptSwap(route, i, k) {
    //Get the part of the list to reverse (line 3 in the psuedoCode)
    let swap = route.slice(i, k + 1);
    //Reverse it
    swap.reverse();
    //Make the new list with the reversed part in the middle
    let newRoute = route.slice(0, i).concat(swap).concat(route.slice(k + 1)); //(Lines 1-4 in the pseudocode
    return newRoute;
}