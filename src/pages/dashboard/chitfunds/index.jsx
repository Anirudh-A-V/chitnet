import React, { useState, Fragment } from "react";
import withAuth from "@/components/HOCs/withAuth";
import Layout from "@/components/dashboard/Layout";
import AvailableChitfunds from "@/components/AvailableChitfunds";
import { useActiveChifunds, useJoinedChitfunds } from "@/utils/queryHooks"
import Head from "next/head";
import JoinedChitfunds from "@/components/JoinedChitfunds"


const tabs = ["Available Chitfunds", "Joined Chitfunds"];

const Tab = ({ tab, active, count, makeActive }) => (
	<button
		onClick={makeActive}
		className={`px-2 pt-1 font-medium transition-all ${active
			? "border-b-2 border-primary-blue pb-[8px] text-gray-950"
			: "border-b pb-[9px] text-gray-700"
			}`}
	>
		{tab} ({count || 0})
	</button>
);

function Users() {
	const [tabIndex, setTabIndex] = useState(0);
	const [detailsModal, setDetailsModal] = useState(false);

	const { isLoading: isLoadingAvailable, isError: isErrorAvailable, data: availableChitfunds, error: errorAvailableChitfunds } = useActiveChifunds();

	const { isLoading: isLoadingJoined, isError: isErrorJoined, data: joinedChitfunds, error: errorJoinedChitfunds } = useJoinedChitfunds();

	if (isErrorJoined || isErrorAvailable) {
		// temperory fix
		console.log("error:", errorJoinedChitfunds, errorAvailableChitfunds);
		return null;
	}

	return (
		<>
			<Head>
				<title>Chitfunds</title>
			</Head>
			<Layout>
				<div>
					<div className="px-7 py-4">
						<h3 className="text-2xl font-semibold">Chitfunds</h3>
					</div>
				</div>
				<div className="h-0.5 w-full bg-slate-200"></div>

				<div className="px-7 py-5">
					<div className="flex w-fit transition-all">
						{tabs.map((tab, index) => (
							<Tab
								tab={tab}
								active={tabIndex === index}
								count={index === 0 ? availableChitfunds?.length : joinedChitfunds?.length}
								makeActive={() => setTabIndex(index)}
								key={index}
							/>
						))}
					</div>

					{tabIndex === 0 ? (
						<AvailableChitfunds loading={isLoadingAvailable} chitfunds={availableChitfunds} setDetailsModal={setDetailsModal}/>
					) : (
						<JoinedChitfunds loading={isLoadingJoined} chitfunds={joinedChitfunds} setDetailsModal={setDetailsModal}/>
					)}
				</div>
			</Layout>
		</>
	);
}

export default withAuth(Users);
