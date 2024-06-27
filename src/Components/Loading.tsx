export interface LoadingProps{
    pendingRequest: boolean[],
    errors: unknown[]
}
export const Loading = ({pendingRequest, errors}: LoadingProps) => {
    return <>
        {pendingRequest && pendingRequest.some(r => r) ? <div>Fetching data...</div> : ""}
        {errors && errors.some(r => r) ? <div>Something goes wrong</div> : ""}
    </>
}