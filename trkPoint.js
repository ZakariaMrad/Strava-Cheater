export class trkPoint {
    constructor(lat, lon, ele, time) {
        this.lat = lat
        this.lon = lon
        this.ele = ele
        this.time = new Date(time)
    }
    asXML() {
        return `<trkpt lat="${this.lat}" lon="${this.lon}">
                    <ele>${this.ele}</ele>
                    <time>${this.time.toISOString()}</time>
                </trkpt>`
    }

}
