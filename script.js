webgazer
	.setGazeListener((data, timestamp) => {
		console.log(data, timestamp)
	})
	.begin()

webgazer.showVideoPreview()