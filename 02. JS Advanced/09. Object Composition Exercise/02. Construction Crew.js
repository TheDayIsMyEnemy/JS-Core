function solve(worker) {
    if(worker.handsShaking){
        worker.handsShaking = false;
        worker.bloodAlcoholLevel += (0.1 * worker.weight * worker.experience);
    }
    return worker;
}
