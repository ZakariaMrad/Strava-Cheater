import { parseXml } from "xml-ns-parser";
import { trkPoint } from "./trkpoint.js";
import { Lign } from "./lign.js";
import fs from 'fs'


export class HikePath {
    constructor(file, path) {
        this.getPoints(file).then(v => {
            let points = v;
            let ligns = this.createLigns(points);
            this.trkPoints = []
            ligns.forEach(element => {
                this.trkPoints.push(...element.trkPoints)
            });
            this.XML = this.asXML()
            fs.writeFileSync(path,this.XML)
        });
    }
    asXML() {
        let xml = `<?xml version="1.0" encoding="UTF-8"?>
        <gpx>
            <metadata>
                <name></name>
                <author>
                    <name>Zikooo</name>
                </author>
            </metadata>
            <trk>
                <name>Hike ${new Date()}</name>
                <type>Running</type>
                <trkseg>`
        this.trkPoints.forEach(trk => {
            xml += trk.asXML();
        });
        xml+=`</trkseg>
        </trk>
    </gpx>`
    return xml
    }

    async parseFile(file) {
        return await parseXml(file);
    }

    async getPoints(file) {
        let parsedFile = await this.parseFile(file)
        let trkPoints = [];
        parsedFile.children[1].children[2].children.forEach(element => {
            trkPoints.push(
                new trkPoint(
                    element.attributes.lat,
                    element.attributes.lon,
                    element.children[0].text,
                    element.children[1].text,
                )
            )
        })
        return trkPoints;
    }

    createLigns(points) {
        let ligns = []
        for (let i = 1; i < points.length; i++) {
            let point1 = points[i - 1];
            let point2 = points[i];
            ligns.push(new Lign(point1, point2))

        }
        return ligns;
    }
}