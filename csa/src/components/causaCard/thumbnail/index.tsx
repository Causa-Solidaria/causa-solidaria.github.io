import styled from "styled-components";

const Image = styled.img`

`


export const Thumbnail = (props) => {
    return (
        <>
            <Image src={props.src}/>
        </>
    )
}