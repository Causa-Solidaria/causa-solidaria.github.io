

const MergeClassnames = (...Classnames : any[])=>{
    return [...Classnames].filter(Boolean).join(" ")
}

export default MergeClassnames 