import zero from './resources/zero.json';
import one from './resources/one.json';
import two from './resources/two.json';
import three from './resources/three.json';
import four from './resources/four.json';
import five from './resources/five.json';
import six from './resources/six.json';
import seven from './resources/seven.json';
import eight from './resources/eight.json';
import nine from './resources/nine.json';

class NumberClassifier {

    constructor() {
        let data = this.parseData();
        this.labelData = data[0];
        this.trainingData = data[1];
    }

    calculateDistance(testingPoint) {
        let distances = [this.trainingData];

        for (let i = 0; i < this.trainingData.length; i++) {
            let dataPoint = this.trainingData[i];
            let sum = 0;

            for (let j = 0; j < dataPoint.length; j++) {
                sum += Math.pow((dataPoint[j] - testingPoint[j]), 2);
            }
            distances[i] = Math.sqrt(sum);
        }
        return distances;
    }

    predictNumber(test_point, k) {
        let distances = this.calculateDistance(test_point);

        let sortedDistances = [];

        for (let i = 0; i < distances.length; i++) {
            let arr = {distances: distances[i], label: this.labelData[i]};
            sortedDistances.push(arr);
        }

        sortedDistances.sort((a, b) => a.distances - b.distances);

        let kValues = {};

        for (let i = 0; i < k; i++) {
            if (sortedDistances[i].label in kValues) {
                kValues[sortedDistances[i].label] += 1;
            } else {
                kValues[sortedDistances[i].label] = 1;
            }
        }

        let occurrences = 0;
        let likelyLabel = null;

        for (let key in kValues) {
            if (kValues[key] > occurrences) {
                occurrences = kValues[key];
                likelyLabel = key;
            }
        }
        console.log(likelyLabel);
        return likelyLabel;
    }

    parseData() {
        let digits = [];
        let labelData = [];
        let trainingData = [];
        
        digits.push(zero);
        digits.push(one);
        digits.push(two);
        digits.push(three);
        digits.push(four);
        digits.push(five);
        digits.push(six);
        digits.push(seven);
        digits.push(eight);
        digits.push(nine);

        for (let i = 0; i < digits.length; i++) {
            for (let j in digits[i]) {
                if (digits[i][j] === "") {
                    continue;
                }
                labelData.push(i);
                trainingData.push(digits[i][j]);
            }
        }

        return [labelData, trainingData]
    }

}

export default NumberClassifier;