var sampleData = [{
    title: "We Use Cookies To Enhance Your Experience",
    desc: "Put some text here indicating why cookies are very very important",
    cat: "cookies"
},{
    title: "We Do Not Share Your Info With Others",
    desc: "Put some other text here indicating why you don't share information with others.",
    cat: "privacy"
},{
    title: "Your Content Belongs To You",
    desc: "Indicate the user's right to the content they post on your site!",
    cat: "rights"
},{
    title: "We Process Payments Through XYZ",
    desc: "Make sure you agree to their Terms as well :)",
    cat: "monetary"
},{
    title: "We Will Not Be Liable For Your Problems",
    desc: "To the maximum extent in which the law in whatever country you live in allows.",
    cat: "law"
},{
    title: "You Must Love Koding To Register",
    desc: "No affiliation here of course.",
    cat: "info"
}];
function activateTerms(){
    $.terms({
        data: sampleData, 
        full: 'http://example.com/terms'
    });
}