const issueContainer = document.getElementById('issueContainer')
const buttonContainer = document.getElementById('buttonContainer')
const loading = document.getElementById('loading')
const my_modal_5 = document.getElementById('my_modal_5')
const searchInput = document.getElementById('searchInput')

const loadingOn = () => {
    loading.classList.remove('hidden')
}
const loadingOff = () => {
    loading.classList.add('hidden')
}



// active Button
buttonContainer.addEventListener('click', (e) => {
    console.log(e);

    if (e.target.localName === 'button') {
        const buttons = document.querySelectorAll('.btn-nav')
        buttons.forEach(btn => {
            btn.classList.remove('btn-primary')
        })
        e.target.classList.add('btn-primary')

        const btnText = e.target.textContent.toLowerCase();
        filteredIssuesByStarus(btnText)
        counter(btnText)
    }
})

let allIssues = []
// load all-Data

const loadAllissue = async () => {
    try {
        loadingOn()
        const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
        const data = await res.json()
        allIssues = data.data
        displayIssue(allIssues);
    } catch (error) {
        console.log(error);
    }
    console.log(allIssues.length);
}
loadAllissue()


const filteredIssuesByStarus = (status) => {
    if (status === 'all') {
        displayIssue(allIssues)
    } else {
        const filteredIssues = allIssues.filter(issue => issue.status === status)
        displayIssue(filteredIssues)
    }
}


let totalCount = document.getElementById('totalCount')
const counter = (status) => {
    let count = 0
    if (status === 'all') {
        count = allIssues.length
    } else {
        count = allIssues.filter(issue => issue.status === status).length
    }
    totalCount.innerText = count
}


// display Data
const displayIssue = (issues) => {

    issueContainer.innerHTML = ''

    issues.forEach(issue => {
        const newDiv = document.createElement('div')
        newDiv.className = 'mb-5'
        newDiv.innerHTML = `
        <div onclick ="loadModals(${issue.id})" class="max-w-sm bg-white border-0 border-t-4 mt-3 h-full flex flex-col justify-between rounded-xl shadow-sm overflow-hidden w-full ${issue.status === "open" ? 'border-green-500' : 'border-purple-600'} ">
                <div class="p-5">
                    <div class="flex justify-between items-start mb-4">
                        <div>
                        ${issue.status === 'open' ? '<img  src="/assests/Open-Status.png" alt="">' : '<img  src="/assests/Closed- Status .png" alt="">'}
                            
                        </div>
                        <span
                            class="px-5 py-1   text-xs font-bold tracking-widest rounded-full uppercase
                             ${issue.priority === "high" ? 'bg-red-100 text-red-600' : 'text-[#F59E0B] bg-amber-100'}"
                            >
                            ${issue.priority}
                        </span>
                    </div>
                    <h3 class="text-xl font-bold text-slate-800 leading-tight mb-2">
                        ${issue.title}
                    </h3>

                    <p class="text-slate-500 text-sm mb-5 line-clamp-2">
                        ${issue.description}
                    </p>

                    <div class="flex gap-2 mb-4">
                        <span
                            class="inline-flex items-center gap-1 px-3 py-1   text-sm font-medium rounded-full uppercase 
                            ${issue.labels[0] === 'enhancement' ? 'bg-green-50 text-green-500'
                : 'bg-red-50 text-red-500'
            }
                            ">
                            ${issue.labels[0]}
                        </span>
                        <span
                            class="inline-flex items-center gap-1 px-3 py-1  text-sm font-medium uppercase rounded-full
                             ${issue.labels[1] === 'enhancement' ? 'bg-green-50 text-green-500'
                : ' text-orange-600'} ${issue.labels[1] ? 'border border-orange-100 bg-orange-50' : 'border-none'
            } ">
                            ${issue.labels[1] ? issue.labels[1] : ''}
                        </span>
                    </div>
                </div>

                <div class="px-5 py-4 border-t border-gray-100 bg-white">
                    <div class="text-slate-500 text-sm space-y-1">
                        <p># ${issue.id} by <span class="hover:underline cursor-pointer">${issue.author}</span></p>
                        <p> createdAt:  ${new Date(issue.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        `
        issueContainer.appendChild(newDiv)
    })
    loadingOff()
}


// Modals

const loadModals = async (issueId) => {
    try {
        const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`)
        const data = await res.json()
        displayModals(data.data);
    } catch (error) {
        console.log(error);
    }
    my_modal_5.showModal()
}

const displayModals = (issue) => {
    const newDiv = document.createElement('div')
    my_modal_5.innerHTML = ''

    newDiv.innerHTML = ` 
    <div class="modal-box max-w-3xl">
            <div class="bg-white rounded-xl  w-full p-8 ">
                <h2 class="text-3xl font-bold text-slate-800 mb-2">Fix broken image uploads</h2>
                <div class="flex items-center gap-3 mb-6">
                    <span
                        class=" text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1
                        ${issue.status === "open" ? 'bg-green-500' : 'bg-red-500'}
                        
                        ">
                        ${issue.status}
                    </span>
                    <span class="text-slate-400 text-sm italic">
                        ~ Opened by <span class="font-semibold text-slate-500"> ${issue.author} </span> ~ ${new Date(issue.createdAt).toLocaleDateString()}
                    </span>
                </div>

                <div class="flex gap-2 mb-8">
                    <p
                        class=" border  px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 
                         ${issue.labels[0]?.toLowerCase() === 'enhancement' ? 'bg-green-50 text-green-500'
            : 'bg-red-50 text-red-500'
        }
                        ">
                        ${issue.labels[0]}
                    </p>
                    <span
                        class="bg-amber-50 text-amber-500 border border-amber-100 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1
                        ${issue.labels[1]?.toLowerCase() === 'enhancement' ? 'bg-green-50 text-green-500'
            : 'bg-orange-50 text-orange-600'}  
                        ">
                       ${issue.labels[1] === undefined ? '-' : issue.labels[1]}
                    </span>
                </div>

                <p class="text-slate-500 text-lg leading-relaxed mb-10">
                   ${issue.description}
                </p>

                <div class="bg-slate-50 rounded-xl p-6 flex justify-between items-center mb-10">
                    <div>
                        <p class="text-slate-400 text-sm mb-1">Assignee: </p>
                        <p class="text-slate-800 font-bold text-lg">${issue.author}</p>
                    </div>
                    <div class="text-center ">
                        <p class="text-slate-400 text-sm mb-1">Priority:</p>
                        <p class=" mt-1 px-5 py-1.5 rounded-sm text-sm font-bold
                         ${issue.priority === "high" ? 'bg-red-100 text-red-600' : 'text-[#e08f03] bg-amber-100'}
                        ">
                           ${issue.priority}
                        </p>
                    </div>
                </div>

            </div>

           <form method="dialog" class="text-right">
    <button class="btn btn-primary">Close</button>
</form>
        </div>
    
    `
    my_modal_5.append(newDiv)
}



const handleSearch = async () => {
    const searchInputValue = searchInput.value.trim()
    if (searchInputValue === '') {
        displayIssue(allIssues)
        counter('all')
        return
    }

    try {
        loadingOn()
        const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchInputValue}`)
        const data = await res.json()
        displayIssue(data.data);
        totalCount.innerText = data.data.length;

    } catch (error) {
        console.log(error);
    }
    loadingOff()

}

searchInput.addEventListener('keypress', (e) => {
    console.log(e);
    if (e.key === 'Enter') {
        handleSearch()
    }
})