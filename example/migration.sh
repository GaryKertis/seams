#!/bin/bash
mongoimport --db test --collection fruits --drop --file sampleData.json
cp -r img ../img