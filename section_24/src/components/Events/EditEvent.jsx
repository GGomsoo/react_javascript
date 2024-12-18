import {
  Link,
  redirect,
  useNavigate,
  useNavigation,
  useParams,
  useSubmit,
} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { fetchEvent, updateEvent, queryClient } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EditEvent() {
  const navigate = useNavigate();
  const { state } = useNavigation(); // 현제 데이터를 전송중인지에 대한 상태
  const submit = useSubmit();

  // 해당 이벤트에 대한 정보를 얻어오기 위한 params, useQuery
  const { id } = useParams();
  const { data, isError, error } = useQuery({
    queryKey: ["event", id],
    queryFn: ({ signal }) => fetchEvent({ id, signal }),
    staleTime: 1000 * 10,
  });

  // // event를 edit 하기 위한 mutation
  // // 이번 경우에는, onSuccess를 통해 navigate 하지 않는다.
  // const { mutate } = useMutation({
  //   mutationFn: updateEvent,

  //   // onMutate에서의 함수는 mutate를 호출하는 즉시 실행된다 => 응답 받기전에 실행
  //   // setQueryData를 통해 이미 저장된 데이터를 응답을 기다리지 않고 사용 가능
  //   onMutate: async (data) => {
  //     const newEvent = data.event;

  //     // 특정 키의 모든 쿼리 이벤트를 취소
  //     // 변형을 취소하는게 아닌, useQuery로 트리거된 쿼리만 취소
  //     await queryClient.cancelQueries({ queryKey: ["event", id] });

  //     // 예전 데이터를 받아온 후, 새로운 데이터로 업데이트 한다
  //     const previousEvent = queryClient.getQueryData(["event", id]);
  //     queryClient.setQueryData(["event", id], newEvent);

  //     return { previousEvent };
  //   },
  //   // 변형에 실패한 경우, 이전 데이터로 롤백
  //   onError: (error, data, context) => {
  //     queryClient.setQueryData(["event", id], context.previousEvent);
  //   },
  //   // 성공 여부와 관계없이 mutate 완료 될 때 호출된다
  //   onSettled: () => {
  //     queryClient.invalidateQueries(["event", id]);
  //   }
  // });

  // action 함수를 호출하기 위한 함수
  function handleSubmit(formData) {
    submit(formData, { method: "PUT" });
  }

  function handleClose() {
    navigate("../");
  }

  let content;

  if (isError) {
    content = (
      <>
        <ErrorBlock
          title="Failed to load event"
          message={error.info?.message || "Failed to load event"}
        />
        <div className="form-actions">
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
      </>
    );
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        {state === "submitting" ? (
          <p>Sending data...</p>
        ) : (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Update
            </button>
          </>
        )}
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}

// 컴포넌트가 화면에 표시되기도 전에 데이터를 가져올 수 있다.
// loader를 통해 최신 데이터를 가져온다
export function loader({ params }) {
  return queryClient.fetchQuery({
    queryKey: ["event", params.id],
    queryFn: ({ signal }) => fetchEvent({ id: params.id, signal }),
  });
}

// 양식이 제출되면, 아래 함수가 트리거가 됌
// 리액트 라우터에 의해 자동으로 전달된 객체를 가져온다
export async function action({ request, params }) {
  const formData = await request.formData();
  const updatedEventData = Object.fromEntries(formData);

  await updateEvent({ id: params.id, event: updatedEventData });

  // 모든 쿼리를 무효화, 업데이트된 이벤트 정보를 가져온다
  await queryClient.invalidateQueries(["event", params.id]);

  return redirect("../");
}
