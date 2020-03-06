import React from 'react';
import './index.css';

export default class OpenIncidents extends React.Component {
	constructor(props) {
		super(props);
		this.videoTutorialList = [
			{
				title: 'video 1',
				url: ''
			},
			{
				title: 'video 2',
				url: ''
			}
		];

		this.documentationList = [
			{
				text: 'Create New Project',
				url: ''
			},
			{
				text: 'Admin Controls',
				url: ''
			},
			{
				text: 'Update Project Details',
				url: ''
			},
			{
				text: 'Update Calculation Sheet',
				url: ''
			},
			{
				text: 'Update ITP and its versions',
				url: ''
			},
			{
				text: 'Update Comment Sheet and its versions',
				url: ''
			},
			{
				text: 'Download reports',
				url: ''
			},
			{
				text: 'Raise Incident',
				url: ''
			}
		];

		this.toggleDiv = this.toggleDiv.bind(this);
	}

	toggleDiv(e) {
		const currentSelection = document.activeElement.className;
		const currentSelectedVideoIndex = Number(currentSelection[currentSelection.length -1])
		for(let i=0; i <= this.videoTutorialList.length; i++){
			if(i === currentSelectedVideoIndex){
				$(`.collapse-${currentSelectedVideoIndex}`).toggle();
			} else {
				$(`.collapse-${i}`).hide();
			}

		}
	}
	render() {
		

		return (
			<div style={{ backgroundColor: 'white', paddingRight: '100px', paddingLeft: '100px', paddingTop: '50px', paddingBottom: '200px' }}>
				<div className="row justify-content-center">
					<div className="col-6 justify-content-center" style={{ borderRight: '1px solid #ced4da', height: '100%' }}>
						<h1>
							Documentations
						</h1>
						<hr />
						<hr />
						<ul class="list-group">
							{
								this.documentationList.map(listElement => {
									return (
										<a style={{ color: 'black', fontSize: '16px' }} href={listElement.url}><li class="list-group-item">{listElement.text}</li></a>
									)
								})
							}
						</ul>
					</div>
					<div className="col-6 justify-content-center">
						<h1>
							Video Tutorials
						</h1>
						<hr />
						<hr />
						<div className="justify-content-center">
							{
								this.videoTutorialList.map((videoElement, key) => {
									return (
										<>
											<div class="card">
												<div class="card-header">
													<h5 class="mb-0">
														<button class={`btn btn-link ${key}`} onClick={this.toggleDiv}>{videoElement.title}</button>
													</h5>
												</div>
												<div className={`collapse-${key}`} style={{display: 'none'}}>
												<iframe className="videoPlayerBox" src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe>
												</div>
											</div>
										</>
									)
								})
							}
						</div>
					</div>
				</div>
			</div>
		)
	}
}