import React from 'react'

const Auth = ({ formDetails, submitValue, onSubmit }) => {
    return (
        <>
            <form onSubmit={onSubmit}>
                {formDetails.map((item, index) => {
                    return (
                        <div className="form-group" key={index}>
                            <input autoFocus={item.isAutoFocus} 
                                className="form-control auth__subsection__subsection__form__input"
                                type={item.type} placeholder={item.placeholder} name={item.name}
                                value={item.value} onChange={item.onChange} 
                            />
                        </div>
                    )
                })}
                
                <input className="btn btn-primary auth__subsection__subsection__form__btn" type="submit" 
                    value={submitValue} 
                />
            </form>
        </>
    )
}

export default Auth