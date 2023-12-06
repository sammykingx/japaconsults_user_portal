// jshint esversion:6
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useGetAllFilesUploadedQuery } from '@/app/services/admin/files';

ChartJS.register(ArcElement, Tooltip, Legend);

export const DocumentUploadDoughnutChart: React.FC = () => {

    const { data: AllDocuments } = useGetAllFilesUploadedQuery();

    const data = {
        labels: ['General', 'Billing', 'Contracts', 'Academics', 'Visa'],
        datasets: [{
            label: 'Documents Uploaded',
            data: [AllDocuments?.general.length ?? 0, AllDocuments?.billing.length ?? 0, AllDocuments?.contracts.length ?? 0, AllDocuments?.academics.length ?? 0, AllDocuments?.visa.length ?? 0],
            backgroundColor: [
                '#68EE76',
                '#8D79F6',
                '#F25F33 ',
                '#FEBD38',
                '#0d4d3d '
            ],
            hoverOffset: 4
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false,
            }

        },
        cutout: "50%"

    }

    return (
        <div className='bg-white p-5 rounded-lg'>

            <h3 className="mb-3 text-center font-Inter-Bold">Documents Uploaded</h3>

            <div className='w-max flex items-center gap-x-3 '>


                {/* Chart */}
                <div className='w-[130px] h-[130px]' >
                    <Doughnut
                        data={data}
                        options={options}
                    />
                </div >

                {/* legend */}
                <div>
                    <div className="flex gap-x-2 items-center">
                        <div className="w-[10px] h-[10px] bg-[#68EE76] rounded-full"></div>
                        <p className="text-xs">General</p>
                    </div>
                    <div className="flex gap-x-2 items-center">
                        <div className="w-[10px] h-[10px] bg-[#8D79F6] rounded-full"></div>
                        <p className="text-xs">Billing</p>
                    </div>
                    <div className="flex gap-x-2 items-center">
                        <div className="w-[10px] h-[10px] bg-[#F25F33] rounded-full"></div>
                        <p className="text-xs">Contracts</p>
                    </div>
                    <div className="flex gap-x-2 items-center">
                        <div className="w-[10px] h-[10px] bg-[#FEBD38] rounded-full"></div>
                        <p className="text-xs">Academics</p>
                    </div>
                    <div className="flex gap-x-2 items-center">
                        <div className="w-[10px] h-[10px] bg-[#0d4d3d] rounded-full"></div>
                        <p className="text-xs">Visa</p>
                    </div>
                </div>
            </div>
        </div>
    )
}