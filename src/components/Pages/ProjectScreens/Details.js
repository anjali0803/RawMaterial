import React from 'react';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import { FileUpload } from 'primereact/fileupload';
import './index.css';
    
class Details extends React.Component {

    uploadHandler() {
        console.log('upload handled');
    }


    render() {
        return (
            <div>
                <FileUpload
                    name="sample.txt" url="../../"
                    uploadHandler={this.uploadHandler}
                    customUpload={true}
                    chooseLabel='' uploadLabel='' cancelLabel='' />
            </div>

        )
    }
}

export default Details;