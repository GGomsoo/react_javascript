import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import { fetchEvent, updateEvent, queryClient } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EditEvent() {
  const navigate = useNavigate();
  // 해당 이벤트에 대한 정보를 얻어오기 위한 params, useQuery
  const { id } = useParams();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["event", id],
    queryFn: ({ signal }) => fetchEvent({ id, signal }),
  });

  // event를 edit 하기 위한 mutation
  // 이번 경우에는, onSuccess를 통해 navigate 하지 않는다.
  const { mutate } = useMutation({
    mutationFn: updateEvent,

    // onMutate에서의 함수는 mutate를 호출하는 즉시 실행된다 => 응답 받기전에 실행
    // setQueryData를 통해 이미 저장된 데이터를 응답을 기다리지 않고 사용 가능
    onMutate: async (data) => {
      const newEvent = data.event;

      // 특정 키의 모든 쿼리 이벤트를 취소
      // 변형을 취소하는게 아닌, useQuery로 트리거된 쿼리만 취소
      await queryClient.cancelQueries({ queryKey: ["event", id] });
      
      // 예전 데이터를 받아온 후, 새로운 데이터로 업데이트 한다
      const previousEvent = queryClient.getQueryData(["event", id]);
      queryClient.setQueryData(["event", id], newEvent);

      return { previousEvent };
    },
    // 변형에 실패한 경우, 이전 데이터로 롤백
    onError: (error, data, context) => {
      queryClient.setQueryData(["event", id], context.previousEvent);
    },
    // 성공 여부와 관계없이 mutate 완료 될 때 호출된다
    onSettled: () => {
      queryClient.invalidateQueries(["event", id]);
    }
  });

  function handleSubmit(formData) {
    mutate({ id, event: formData})
    navigate("../");
  }

  function handleClose() {
    navigate("../");
  }

  let content;

  if (isPending) {
    content = (
      <div className="center">
        <LoadingIndicator />
      </div>
    );
  }

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
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}
