

const loading = document.getElementById('loading')

const loadingOn = () => {
    loading.classList.remove('hidden')
}
const loadingOff = () => {
    loading.classList.add('hidden')
}



const buttonContainer = document.getElementById('buttonContainer')
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
    const issueContainer = document.getElementById('issueContainer')
    issueContainer.innerHTML = ''

    issues.forEach(issue => {
        const newDiv = document.createElement('div')
        newDiv.innerHTML = `
        <div class="max-w-sm bg-white border-0 border-t-4  rounded-xl shadow-sm overflow-hidden w-full ${issue.status === "open" ? 'border-green-500' : 'border-purple-600'} ">
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
                            class="inline-flex items-center gap-1 px-3 py-1  border border-red-100  text-sm font-medium rounded-full
                            ${issue.labels[0] === 'enhancement' ? 'bg-green-50 text-green-500'
                : 'bg-red-50 text-red-500'
            }
                            ">
                            ${issue.labels[0]}
                        </span>
                        <span
                            class="inline-flex items-center gap-1 px-3 py-1 border border-orange-100  text-sm font-medium rounded-full
                             ${issue.labels[1] === 'enhancement' ? 'bg-green-50 text-green-500'
                : 'bg-orange-50 text-orange-600'
            }
                            ">
                            ${issue.labels[1] === undefined ? '-' : issue.labels[1]}
                        </span>
                    </div>
                </div>

                <div class="px-5 py-4 border-t border-gray-100 bg-white">
                    <div class="text-slate-500 text-sm space-y-1">
                        <p># ${issue.id} by <span class="hover:underline cursor-pointer">${issue.author}</span></p>
                        <p> createdAt:  ${issue.createdAt}</p>
                        <p> updatedAt:  ${issue.updatedAt}</p>
                    </div>
                </div>
            </div>
        `
        issueContainer.appendChild(newDiv)
    })
    loadingOff()
}
