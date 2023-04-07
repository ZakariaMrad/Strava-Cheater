import { trkPoint } from "./trkpoint.js";

export class Lign {
    constructor(trkPointStart, trkPointEnd) {

        let trkPointsToMake = this.gettrkToMake(trkPointStart, trkPointEnd)
        this.trkPoints = []

        this.createTrkPoints(trkPointsToMake, trkPointStart, trkPointEnd);
    }

    gettrkToMake(trkPointStart, trkPointEnd) {
        let date1 = new Date(trkPointStart.time);
        let date2 = new Date(trkPointEnd.time);
        return Math.ceil((date2 - date1) / 1000)
    }

    createTrkPoints(trkPointsToMake, trkPointStart, trkPointEnd) {
        const lat = Math.round((trkPointEnd.lat - trkPointStart.lat) / trkPointsToMake * 100000000) / 100000000
        const lon = Math.round((trkPointEnd.lon - trkPointStart.lon) / trkPointsToMake * 100000000) / 100000000
        let lastLat = +trkPointStart.lat
        let lastLon = +trkPointStart.lon
        let ele = trkPointStart.ele
        let datetime = new Date(trkPointStart.time)

        for (let i = 0; i < trkPointsToMake - 1; i++) {
            lastLat = Math.round((lastLat + lat) * 100000000) / 100000000
            lastLon = Math.round((lastLon + lon) * 100000000) / 100000000
            datetime.setSeconds(datetime.getSeconds() + 1)
            this.trkPoints.push(
                new trkPoint(lastLat, lastLon, ele, datetime)
            )
        }
    }
}