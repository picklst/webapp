import React from 'react';
import Button from "../../../../components/ui/Button";

const defaultLabels = {
   "save": "Save",
   "proceed": "Proceed"
};

export default ({
   editor, previewer, propertyName, labels: labelProps,
   isEditing, isInitializing, showSkip,
   onSave, onSkip, onRequestEdit
}) => {
   const labels = {...defaultLabels, ...labelProps};

   return <div className="animated fadeIn py-1">
      { isEditing ?
          <form onSubmit={(e) => { e.preventDefault(); onSave(true); }}>
             {editor}
             <div className="my-2">{ showSkip ?
                 <Button
                     text="Skip" onClick={() => onSkip()}
                     className="animated fadeIn rounded-pill mr-2 px-4 py-2"
                 /> :
                 <Button
                     brandAccent
                     text={isInitializing ? labels.proceed : labels.save} type="submit"
                     className="animated fadeIn rounded-pill px-4 py-2"
                 />}
             </div>
          </form> :
          <React.Fragment>
             <div className="text-primary font-weight-bold d-flex">
                <div className="col-9 d-flex align-items-center px-2">
                   {propertyName}
                </div>
                <div className="col-3 p-0 d-flex align-items-center justify-content-end">
                   <Button
                       className="small px-2 no-shadow"
                       onClick={onRequestEdit}
                       text={<span className="text-primary">Edit</span>}
                   />
                </div>
             </div>
             <div className="px-2">
                {previewer}
             </div>
          </React.Fragment>
      }
   </div>
};

