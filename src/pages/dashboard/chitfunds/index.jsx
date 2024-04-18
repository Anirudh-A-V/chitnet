import React, { useState, Fragment } from "react";
import withAuth from "@/components/HOCs/withAuth";
import Layout from "@/components/dashboard/Layout";
import AvailableChitfunds from "@/components/AvailableChitfunds";
// import Pending from "@/components/users/Pending";
import { useActiveChifunds, useJoinedChitfunds } from "@/utils/queryHooks"
import { Transition, Dialog } from "@headlessui/react";
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
				{/* <UpdateDetails updateModal={updateModal} setUpdateModal={setUpdateModal} details={details} /> */}
				{/* <Transition appear show={detailsModal} as={Fragment}>
					<Dialog as="div" className="relative z-10" onClose={() => setDetailsModal(false)}>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<div className="fixed inset-0 bg-black/25" />
						</Transition.Child>

						<div className="fixed inset-0 overflow-y-auto">
							<div className="flex min-h-full items-center justify-center p-4 text-center">
								<Transition.Child
									as={Fragment}
									enter="ease-out duration-300"
									enterFrom="opacity-0 scale-95"
									enterTo="opacity-100 scale-100"
									leave="ease-in duration-200"
									leaveFrom="opacity-100 scale-100"
									leaveTo="opacity-0 scale-95"
								>
									<Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
										<Dialog.Title
											as="h3"
											className="text-lg font-medium leading-6 text-gray-900"
										>
											Details
										</Dialog.Title>
										<div className="flex justify-center items-start gap-6">
											<div className="mt-2">
												<p className="text-sm my-1 text-gray-500">
													<span className="font-semibold">Name: </span>
													{details?.name}
												</p>
												<p className="text-sm my-1 text-gray-500">
													<span className="font-semibold">Email: </span>
													{details?.email}
												</p>
												<p className="text-sm my-1 text-gray-500">
													<span className="font-semibold">Location: </span>
													{details?.location}
												</p>
												<p className="text-sm my-1 text-gray-500">
													<span className="font-semibold">Year: </span>
													{details?.year}
												</p>
												<p className="text-sm my-1 text-gray-500">
													<span className="font-semibold">Car Make: </span>
													{details?.carMake}
												</p>
												<p className="text-sm my-1 text-gray-500">
													<span className="font-semibold">Car Model: </span>
													{details?.carModel}
												</p>
												<p className="text-sm my-1 text-gray-500">
													<span className="font-semibold">Registration Number: </span>
													{details?.registrationNumber}
												</p>
												<p className="text-sm my-1 text-gray-500">
													<span className="font-semibold">Mobile Number: </span>
													{details?.mobileNumber}
												</p>

											</div>
											<div className="mt-2">
												<p className="text-sm my-1 text-gray-500">
													<span className="font-semibold">Services Count: </span>
													<div className="ml-4">
														{details?.servicesCount?.map((service) => (
															<div>
																{service?.name}: {service?.count}/{service?.maxCount}
															</div>
														))}
													</div>
												</p>
												{details?.pastServices?.length > 0 &&
													<p className="text-sm my-1 text-gray-500">
														<span className="font-semibold">Past Services: </span>
														<div className="ml-4">
															{details?.pastServices?.map((service) => (
																<div>
																	{service?.name}: {service?.count}/{service?.maxCount}
																</div>
															))}
														</div>
													</p>
												}
												<p className="text-sm my-1 text-gray-500">
													<span className="font-semibold">Payment Date: </span>
													{details?.paymentDate}
												</p>
												<p className="text-sm my-1 text-gray-500">
													<span className="font-semibold">Approved: </span>
													{details?.isApproved ? "Yes" : "No"}
												</p>
											</div>
										</div>

										<div className="mt-4">
											<button
												type="button"
												className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm my-1 font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
												onClick={() => setDetailsModal(false)}
											>
												Close
											</button>
										</div>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</Dialog>
				</Transition> */}
			</Layout>
		</>
	);
}

export default withAuth(Users);
